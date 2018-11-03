
let userAccount;
async function startApp(){
    var contractAddress = "0x87Bde3670587e2B013fd2CdFb830c09F60e3Fc30";
    contract = new web3js.eth.Contract(contractABI, contractAddress);

    const result = await sampleResolve();
    // $('.segment').dimmer('show');
    // $('.segment').dimmer('hide');
    
    var n = await getn();
    var data = await get(n);
    console.log(data)
    market();
};

function sampleResolve(userAccount) {
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

window.addEventListener('load', function () {
    if (typeof web3 !== 'undefined') {
        console.log("MetamaskOK")
        web3js = new Web3(web3.currentProvider);
    } else {
        console.log("NG")
        alert("Please start up the Metamask and connect to the Mainnet.")
    }
    startApp()
    // $('.segment').dimmer('show');
    // $('.segment').dimmer('hide');

})


//スマートコントラクト部
$(document).on("click", "#confirm", function () {
    token(); 
});

async function token(account){
  const result = await sampleResolve();
  const img_url = await readFile(this);
  const url = await ipfs_test(img_url);
  
  
  contract.methods.mintTokenCollection(url)
      .send({ from: result, gasLimit: "340000" })
      .on("transactionHash", function (_receipt) {
          alert("Now your Token Collection is being published. txhash:" + _receipt);
          console.log("txhash: " + _receipt)
      })
      .on("receipt", function (_receipt) {
          console.log(_receipt);
      })
      .on("error", function (_error) {
          console.log(_error);
      })
      $('.segment').dimmer('hide');
};



var ipfs = window.IpfsApi({ host: 'ipfs.infura.io', protocol: 'https' });


function readFile(input) {
  return new Promise(resolve => {

  var digitalArt = document.getElementById("publish");
  var idxDot = digitalArt.value.lastIndexOf(".") + 1;
  var extFile = digitalArt.value.substr(idxDot, digitalArt.value.length).toLowerCase();
  if (extFile == "jpeg" || extFile == "png"|| extFile == "jpg" || extFile == "gif") {
      
    $('.segment').dimmer('show');
      var reader = new FileReader();
      reader.readAsArrayBuffer(digitalArt.files[0]);
      reader.onloadend = function (event) {
          console.log(reader.result)
          var buf = buffer.Buffer(reader.result)
          ipfs.add(buf, (err, result) => {
            imageHash = result[0].hash;
            var url = "https://ipfs.io/ipfs/" + imageHash;
            console.log(url);
            resolve(url)
          });
      }
  } else {
      alert("Only jpeg/gif/png files are allowed!");
      $('.segment').dimmer('hide');
  }
  })
}

//IPFSにトークンURIを登録
function ipfs_test(img_url){
  return new Promise(resolve => {
  
  var e_name = document.getElementById('e_name').value;
  var e_desc = document.getElementById('e_desc').value;
//   console.log(e_name);
//   console.log(e_desc);
  
  var text ='{\n'
  +'"name": "'+ e_name +'",\n'
  +'"image": "' + img_url + '",\n'
  + '"description": "'+ e_desc + '"\n'
  +'}'  
  
  console.log(text);
  var buf = buffer.Buffer(string_to_utf8_bytes(text));
  ipfs.add(buf, (err, result) => {
          textHash = result[0].hash;
          var url = "https://ipfs.io/ipfs/" + textHash;
          message.innerHTML = "You can share your image by following link";

          console.log("Metadata: " + url)
          resolve(url)
      });
  })
}

function string_to_utf8_bytes(text){
  var result = [];
  if (text == null)
      return result;
  for (var i = 0; i < text.length; i++) {
      var c = text.charCodeAt(i);
      if (c <= 0x7f) {
          result.push(c);
      } else if (c <= 0x07ff) {
          result.push(((c >> 6) & 0x1F) | 0xC0);
          result.push((c & 0x3F) | 0x80);
      } else {
          result.push(((c >> 12) & 0x0F) | 0xE0);
          result.push(((c >> 6) & 0x3F) | 0x80);
          result.push((c & 0x3F) | 0x80);
      }
  }
  return result;
}

