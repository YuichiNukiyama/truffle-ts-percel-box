import CoinOperator from "./CoinOperator";
const coinOperator = new CoinOperator();

window.onload = () => {

    initializeUI();
    setEvents();

    /**
     * set all accounts to select elements.
     */
    async function initializeUI() {
        const accounts = await coinOperator.getAllAccounts();
        const accountsList = document.getElementById("accounts_list") as HTMLOListElement;
        const getBalanceSelect = document.getElementById("getBalance_select") as HTMLSelectElement;
        const getBalanceInEthSelect = document.getElementById("getBalanceInEth_select") as HTMLSelectElement;
        const sendCoinFromSelect = document.getElementById("sendCoin_from_select") as HTMLSelectElement;
        const sendCoinToSelect = document.getElementById("sendCoin_to_select") as HTMLSelectElement;

        for (const account of accounts) {
            // settings for accounts_list
            const liEle = document.createElement("li");
            liEle.innerText = account;
            accountsList.appendChild(liEle);

            // settings for select element
            const opEle = document.createElement("option");
            opEle.value = account;
            opEle.text = account;
            getBalanceSelect.appendChild(opEle);
            getBalanceInEthSelect.appendChild(opEle.cloneNode(true));
            sendCoinFromSelect.appendChild(opEle.cloneNode(true));
            sendCoinToSelect.appendChild(opEle.cloneNode(true));
        }
    }

    /**
     * set event handler to buttons
     */
    function setEvents() {
        // event for getBalance method.
        document.getElementById("getBalance_execute")!
            .addEventListener("click", async () => {
                const input = document.getElementById("getBalance_select") as HTMLSelectElement

                // call contract method.
                const result = (await coinOperator.getBalance(input.value)).toString();
                showResult(result);
            });

        // event for getBalanceInEth method.
        document.getElementById("getBalanceInEth_execute")!
            .addEventListener("click", async () => {
                const input = document.getElementById("getBalanceInEth_select") as HTMLSelectElement;

                // call contract method.
                const result = (await coinOperator.getBalance(input.value)).toString();
                showResult(result);
            });

        // event for sendCoin method.
        document.getElementById("sendCoin_execute")!
            .addEventListener("click", async () => {
                const inputFrom = document.getElementById("sendCoin_from_select") as HTMLSelectElement;
                const inputTo = document.getElementById("sendCoin_to_select") as HTMLSelectElement;
                const inputAmount =  document.getElementById("sendCoin_amount") as HTMLInputElement;

                // call contract method.
                await coinOperator.sendCoin(inputFrom.value, inputTo.value, parseInt(inputAmount.value));
                showResult("Please check getBalance method. If sendCoin executed successfully, getBalance method will return new value.");
            });

        /**
         * display result in HTML document.
         * @param data data that you want to show.
         */
        function showResult(data: string) {
            const resultEle =  document.getElementById("result") as HTMLDivElement;
            resultEle.innerText = data;
            resultEle.removeAttribute("hidden");
        }
    }
};