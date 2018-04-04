declare module "*.json" {
    const value: {
        contractName: string,
        abi: abi[],
        compiler: {
            name?: string
            version?: string
        },
        networks: any,
        schemaVersion: string,
        updatedAt: string,
        deployedBytecode: string,
        bytecode: string,
        sourceMap: string,
        deployedSourceMap: string,
        source: string,
        sourcePath: string,
        ast: any
    };
    export default value;
}

interface abi {
    inputs?: [
        {
            indexed?: boolean,
            name?: string,
            type?: string
        }
    ],
    payable?: boolean,
    stateMutability?: string,
    type?: string
    anonymous?: boolean,
    constant?: boolean,
    outputs?: any[]
}