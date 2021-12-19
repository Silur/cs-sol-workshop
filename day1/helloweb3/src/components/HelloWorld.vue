<template>
  <div class="hello">
    Web3 connected: {{isConnected}}
    <button @click="connectWallet">Connect wallet</button>
  </div>
</template>

<script>
import Web3 from "web3";
import Web3Modal from "web3modal";
export default {
  name: 'HelloWorld',
  data: () => {
    return {
      isConnected: false
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

      const web3 = new Web3(provider);
      this.isConnected = await web3.eth.getBlock('latest') !== null;
    }
  },
}
</script>

<style scoped>
</style>
