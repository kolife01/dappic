let userAccount;
let owner;
let owner_num;
let test1;

window.addEventListener('load', function () {
    checkweb3()
    startApp()
    // fuwat()
})


async function startApp(){
    // var contractAddress = "0x056939771022e45003feda84f7f4c455126f3c54"; //v2
    var contractAddress = "0xba88874d79833f1495babb5264da4d205e89b458"; //v3
    contract = new web3js.eth.Contract(contractABI, contractAddress);

    // sampleResolve();
    var accountInterval = setInterval(function () {
        web3.eth.getAccounts((error, accounts) => {
            if (accounts[0] !== userAccount) {
                userAccount = accounts[0];
                console.log(userAccount)
            }
        });
    }, 100);
    
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
    alert("Please start up the Metamask and connect to the Rinkeby testnet.")
  }

}


$(document).ready(function() {
    $(".luxbar-item").click(function () {
      $('#luxbar-checkbox').prop('checked', false);
    });
  });



$('#example3')
  .progress({
    total: 3
  })
;

//LPふわっと
//Roterレンダリング後はhiddenが機能しない
// function fuwat(){
//     $('.fuwat').css('visibility','hidden');
//     $(window).scroll(function(){
//      var windowHeight = $(window).height(),
//          topWindow = $(window).scrollTop();
//      $('.fuwat').each(function(){
//       var objectPosition = $(this).offset().top;
//       if(topWindow > objectPosition - windowHeight + 200){
//        $(this).addClass("fuwatAnime");
//       }
//      });
//     });
//   };