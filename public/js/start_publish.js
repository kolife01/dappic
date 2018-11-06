


function test(){
    $('.segment').dimmer('show');
    $('.segment').dimmer('hide');

}


//スマートコントラクト部
$(document).on("click", "#confirm", function () {
    // onButtonClick()
    //checkboxがなぜか取得出来ない
    // var check1 = document.form.checkbox.checked;
    // if(check1 == true){
    //     token(); 
    // }else{
    //     alert('利用規約にチェックしてください')
    // }

    token(); 
    
});

async function token(){
  //   const result = await sampleResolve();
  // sampleResolve();
  const result = userAccount;
  const name = document.getElementById('e_name').value;
  const description = document.getElementById('e_desc').value;
  const _price = document.getElementById('e_price').value;
  const price = _price * 1000000000000000000;
  const check1 = document.form1.Checkbox1.checked;

  
  if(isNumber(price) && check1 == true){
    
      const img_url = await readFile(this);
  
      console.log(img_url,name,description,price)

      contract.methods.mintpicture(img_url,name,description,price)
        .send({ from: result, gasLimit: "500000" })
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
  
  }else{
    alert("Please check field")
  }
  

  
  
};

function isNumber(numVal){
  // チェック条件パターン
  var pattern = /^([1-9]\d*|0)(\.\d+)?$/;
  // 数値チェック
  return pattern.test(numVal);
}


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



//実装出来ず
$('.field.example form')
  .form({
    fields: {
      checkbox: {
        identifier  : 'checkbox',
        rules: [
          {
            type   : 'checked',
            prompt : 'Please check the checkbox'
          }
        ]
      }
    }
  });


  
  // function onButtonClick() {
  //   check1 = document.form.checkbox.checked;

  //   if (check1 == true) {
  //       console.log("ok")
  //   } else {
  //     console.log("ng")
  //   }
  // }


  function onButtonClick() {
    
    check1 = document.form1.Checkbox1.checked;

    if (check1 == true) {
      
    } else {
      alert("Please check terms of service")
    }
  }