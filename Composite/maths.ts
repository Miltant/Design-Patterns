// entry point (unique export)

export function evaluate(input: string): number {
    const ast = Parser.getAST(input);
    if (typeof ast === 'number')
        return ast;

    return ast.evaluate();
}

// types

interface NestedArray<T> extends Array<T | NestedArray<T>> { }

type FlatTokenType = 'number' | 'operator';
type TokenType = 'open_braket' | 'close_braket' | FlatTokenType;

class Token<T> {
    constructor(
        public value: string,
        public type: T 
    ) {}
}

// Parser facade

class Parser {
    public static getAST(input: string): Operation | number { // abstract syntax tree
        const tokens = Parser.tonekise(input);
        const tokenTree = Parser.parse(tokens);
        return OperationFactory.build(tokenTree);
    }

    private static parse(tokens: Token<TokenType>[]): NestedArray<Token<FlatTokenType>> {
        const document = [] as NestedArray<Token<FlatTokenType>>;
        let buffer = [] as Token<FlatTokenType>[];
        let nesting_level = 0;

        for (let i = 0; i < tokens.length; i++) {
            if (['open_braket', 'close_braket'].includes(tokens[i].type)) {
                switch (tokens[i].type) {
                    case 'open_braket': ++nesting_level; ++i; break;
                    case 'close_braket': --nesting_level;
                }
            }
            
            if (nesting_level > 0) {
                buffer.push(tokens[i] as Token<FlatTokenType>);
            } else {
                if (tokens[i].type === 'close_braket' && buffer.length > 0) {
                    document.push(Parser.parse(buffer));
                    buffer = [];
                } else {
                    document.push(tokens[i] as Token<FlatTokenType>);
                }
            }
        }

        return document;
    }

    private static tonekise(input: string): Token<TokenType>[] {
        const buffer = [] as Token<TokenType>[];
        let numBuffer = '';

        for (let i = 0; i <= input.length; i++) {
            const char = input[i];
            
            if (/[\d\.]/.test(char)) {
                numBuffer += char;
                continue;
            }

            if (numBuffer) {
                buffer.push(new Token(numBuffer, 'number'));
                numBuffer = '';
            }
            
            if (/[\s]/.test(char) || char == undefined)
                continue;

            else if (char === '(')
                buffer.push(new Token(char, 'open_braket'));
            else if (char === ')')
                buffer.push(new Token(char, 'close_braket'));
            else if (OperationFactory.isSupported(char))
                buffer.push(new Token(char, 'operator'));
            else
                throw new Error(`Undefined token ${char}`);
        }

        return buffer;
    }
}

// AST classes (composite evaluation)

interface OperationClass {
    new (children: (Operation | number)[]): Operation;
    getOperatorToken(): string;
    getPrecedence(): number;
};
abstract class Operation {
    constructor (protected children: (Operation | number)[]) {}

    protected abstract op(a: number, b: number): number;
    public evaluate(): number {
        let n = this.children[0] instanceof Operation ? this.children[0].evaluate() : this.children[0] as number;
        for (let i = 1; i < this.children.length; i++) {
            const child = this.children[i];
            if (child instanceof Operation)
                n = this.op(n, child.evaluate());
            else
                n = this.op(n, child);
        }
        return n;
    }

    public static getOperatorToken() { return '*' }
    public static getPrecedence() { return 1 }
}

class Addition extends Operation {
    protected op(a: number, b: number): number {
        return a + b;
    }
    public static getOperatorToken() { return '+' }
    public static getPrecedence() { return 0 }
}

class Multiplication extends Operation {
    protected op(a: number, b: number): number {
        return a * b;
    }
}

class Substraction extends Operation {
    protected op(a: number, b: number): number {
        return a - b;
    }
    public static getOperatorToken() { return '-' }
    public static getPrecedence() { return 0 }
}

class Power extends Operation {
    protected op(a: number, b: number): number {
        return a ** b;
    }
    public static getOperatorToken() { return '^' }
    public static getPrecedence() { return 2 }
}

class Division extends Operation {
    protected op(a: number, b: number): number {
        return a / b;
    }
    public static getOperatorToken() { return '/' }
}

class Modulo extends Operation {
    protected op(a: number, b: number): number {
        return a % b;
    }
    public static getOperatorToken() { return '%' }
}

// helpers to build Operation objects

class OperationFactory {
    private static supportedOperations = new Map<string, OperationClass>([
        [Addition.getOperatorToken(), Addition],
        [Multiplication.getOperatorToken(), Multiplication],
        [Substraction.getOperatorToken(), Substraction],
        [Division.getOperatorToken(), Division],
        [Modulo.getOperatorToken(), Modulo],
        [Power.getOperatorToken(), Power]
    ]);

    public static isSupported(operation: string): boolean {
        return OperationFactory.supportedOperations.has(operation);
    }

    private static getClass(operation: string): OperationClass {
        const _class = OperationFactory.supportedOperations.get(operation);

        if (!_class)
            throw new Error(`Unsupported operation token ${operation}`);

        return _class;
    }

    private static getMinPrecedence(tokens: NestedArray<Token<FlatTokenType>>): { val: number, index: number } {
        return tokens.reduce((tmp_max, current, i) =>{
            return (current instanceof Token && current.type === 'operator') &&
                OperationFactory.getClass(current.value).getPrecedence() < tmp_max.val ?
                    { val: OperationFactory.getClass(current.value).getPrecedence(), index: i } :
                    tmp_max;
        },
            { val: Infinity, index: -1 }
        );
    }

    public static build(tokens: NestedArray<Token<FlatTokenType>>): Operation | number {
        if (tokens.length === 1) {
            if (tokens[0] instanceof Token)
                return parseFloat(tokens[0].value);
            else
                tokens = tokens[0] as NestedArray<Token<FlatTokenType>>;
        }
        const maxPrecedence = OperationFactory.getMinPrecedence(tokens).index;
        const pivot = (tokens[maxPrecedence] as Token<FlatTokenType>).value;

        if (!OperationFactory.isSupported(pivot)) {
            if (tokens.length === 1) {
                const tok = tokens[0] as Token<FlatTokenType>;
                if (tok.type === 'number')
                    return parseFloat(tok.value);

                throw new Error(`Invalide isolated token ${tokens.toString()}`)
            } else {
                throw new Error(`Syntax error near ${tokens.toString()}`)
            }
        }

        return new (OperationFactory.getClass(pivot) as OperationClass)([
            OperationFactory.build(tokens.slice(0, maxPrecedence)),
            OperationFactory.build(tokens.slice(maxPrecedence + 1))
        ]);
    }
}