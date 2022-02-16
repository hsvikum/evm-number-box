import { defineStore } from "pinia";
import { ethers } from "ethers";
import contractABI from "../../artifacts/contracts/MessageBox.sol/MessageBox.json"
const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

const getContractInstance = async () => {
    const signer = getSignerInstance()
    const messageBoxContract = new ethers.Contract(contractAddress, contractABI.abi, signer);
    return messageBoxContract;
}

const getSignerInstance = () => {
    const provider = getProviderInstance();
    const signer = provider.getSigner();
    return signer;
}

const getProviderInstance = () => {
    const { ethereum } = window;
    if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        return provider;
    } else {
        throw Error("No ethereum provider found");
    }
}
export const useEtherStore = defineStore('ether',{
  state: () => ({
    account: '',
    loading: false,
    message: '',
    messages: [],
    chainId: 0
  }),
  actions: {
    async getAllMessages() {
        this.loading = true;
        try {
            const messageBoxContract = await getContractInstance();
            this.messages = await messageBoxContract.getAllMessages();
        } catch (e) {
            console.error(e);
        } finally {
            this.loading = false;
        }
    },
    async addMessage() {
        this.loading = true;
        try {
            const messageBoxContract = await getContractInstance();
            const tnx = await messageBoxContract.addMessage(this.message);
            await tnx.wait();
            this.message = '';
            await this.getAllMessages();
        } catch (e) {
            console.error(e);
        } finally {
            this.loading = false;
        }
    },
    async getAccount() {
        this.loading = true;
        try {
            const signer = getSignerInstance()
            this.account = await signer.getAddress();
            const { chainId } = await getProviderInstance().getNetwork();
            this.chainId = chainId;
            await this.getAllMessages();
        } catch (e) {
            console.error(e);
        } finally {
            this.loading = false;
        }
    },
    async connectWallet(silent: boolean = false) {
        const { ethereum } = window;
        this.loading = true;
        try {
            if (!ethereum) {
                if (!silent) {
                    alert("Please install MetaMask");
                }
                return;
            }
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });

            if (accounts.length) {
                await this.getAccount();
            }
        } catch (e) {
            console.error(e);
        } finally {
            this.loading = false;
        }
    }
}
});
