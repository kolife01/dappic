


function test(){
    $('.segment').dimmer('show');
    $('.segment').dimmer('hide');

}


//スマートコントラクト部
$(document).on("click", "#confirm", function () {
    token(); 
});

async function token(){
//   const result = await sampleResolve();
    sampleResolve();
  const result = userAccount;
  console.log(2)
    const img_url = await readFile(this);
//  const url = await ipfs_test(img_url);
    const name = document.getElementById('e_name').value;
    const description = document.getElementById('e_desc').value;

    console.log(img_url,name,description)
  
  
  contract.methods.mintpicture(img_url,name,description)
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
