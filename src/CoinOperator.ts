import Web3 from "web3";
import metaCoin from "../build/contracts/MetaCoin.json";
import { Contract, TransactionReceipt } from "web3/types";


export default class CoinOperator {
    private readonly web3: Web3;
    private readonly metaCoinContract: Contract;

    public constructor() {
        this.web3 = new Web3("ws://localhost:9545");
        /* Notice: `metaCoin.networks["4447"].address` return the address when truffle deployed the contract.
        *  4447 is default network id of truffle develop.
        *  for more detail, see `../buid/contract/MetaCoin.json`.
        * */
        this.metaCoinContract = new this.web3.eth.Contract(metaCoin.abi, metaCoin.networks["4447"].address);
    }

    /**
     * return all accounts. truffle has 10 accounts by default.
     */
    public getAllAccounts() {
        return this.web3.eth.getAccounts();
    }

    /**
     * get the balance of methacoin.
     * @param address address to get the balance of methacoin.
     */
    public getBalance(address: string): Promise<number> {
        return this.metaCoinContract.methods.getBalance(address)
                .call({ from: address });
    }

    /**
     * get the balance of methacoin in eth.
     * @param address address to get the balance of methacoin.
     */
    public getBalanceInEth(address: string): Promise<number> {
        return this.metaCoinContract.methods.getBalanceInEth(address)
                .call({ from: address });
    }

    /**
     * check whether the transaction is mined in the block.
     * @param hash hash value of Transaction.
     */
    public async isMined(hash: string): Promise<boolean> {
        const result = await this.web3.eth.getTransaction(hash);
        if(result.blockNumber) {
            return true;
        }
        return false;
    }

    public sendCoin(fromAddress: string, toAddress: string, amount: number): Promise<TransactionReceipt> {
        return this.metaCoinContract.methods.sendCoin(toAddress, amount)
            .send({ from: fromAddress });
    }
}