<template>
  <div class="main">
    Web3 connected: {{isConnected}}<br>
    <button @click="connectWallet">Connect wallet</button><br>

    <div style="margin-top: 20px">
      Address to mint: <input v-model="address"/><br>
      <button @click="mint">Mint</button><br>
    </div>

    <div style="margin-top: 20px">
      Token to check: <input v-model="token"/><br>
      <button @click="checkToken">Check</button><br>
    </div>

    <div style="margin-top: 20px" v-if="resultToken">
      {{ resultToken.owner }} - {{ resultToken.uri }}
    </div>

  </div>
</template>

<script>
import Web3 from "web3";
import Web3Modal from "web3modal";
import abi from "@/assets/abi.json";
let contract = null;
let web3 = null;
export default {
  name: 'HelloWorld',
  data: () => {
    return {
      isConnected: false,
      address: null,
      token: null,
      resultToken: null
    }
  },
  methods: {
    connectWallet: async function () {
      const providerOptions = {
        /* See Provider Options Section */
      };

      const web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions // required
      });

      const provider = await web3Modal.connect();

      web3 = new Web3(provider);
      this.isConnected = await web3.eth.getBlock('latest') !== null;
      contract = new web3.eth.Contract(abi, process.env.VUE_APP_CONTRACT);
      this.web3 = web3
    },
    checkToken: async function() {
      try {
        const owner = await contract.methods.ownerOf(this.token).call();
        const uri = await contract.methods.tokenURI(this.token).call();
        this.resultToken = { owner, uri };
      } catch (e) {
        console.log(e);
      }
    },
    mint: async function() {
      try {
      const defaultAccount = (await web3.eth.getAccounts())[0];
      const tx = await contract.methods.mintPeon(this.address, 
        "https://localhost:4000/tokens/asd")
      .send({from: defaultAccount});
      console.log(tx);
      } catch (e) {
        console.log(e);
      }
    }
  },
}
</script>

<style scoped>
</style>

