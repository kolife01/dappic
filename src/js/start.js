let userAccount;

async function startApp(){
    var contractAddress = "0x87Bde3670587e2B013fd2CdFb830c09F60e3Fc30";
    contract = new web3js.eth.Contract(contractABI, contractAddress);

    sampleResolve();
    
};


function sampleResolve() {
    return new Promise(resolve => {
        web3.eth.getAccounts((error, accounts) => {
            if (accounts[0] !== userAccount) {
                userAccount = accounts[0];
                console.log(userAccount);
                // userAccount = "";
                resolve(userAccount);
            };
        });  
    });
};

function checkweb3(){
  if (typeof web3 !== 'undefined') {
    console.log("MetamaskOK")
    web3js = new Web3(web3.currentProvider);
  } else {
    console.log("NG")
    alert("Please start up the Metamask and connect to the Mainnet.")
  }

}
