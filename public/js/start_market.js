

//---------------- Market ----------------//
// var data =[]

async function startMarket(){
  // var n = await getn();

  // for(var i = 1; i <= n; i++){
  //   await getAlltokenURI(i)
  // }
  
  console.log(data)
  market();
};


function getn(){
  return new Promise(resolve => {
    contract.methods.totalSupply().call().then(function (_val) {
        console.log(_val);
        resolve(_val)
    });
  })
}


function getAlltokenURI(i){
  return new Promise(resolve => {
      contract.methods.tokenURI(i).call().then(function (_val) {
        console.log(_val);
        data.push(_val)
        resolve(_val)
    });
  })
}



function market(){
  var msg = "";
  for(let i =0; i<data.length; i++){
    var n = data[i]

    $.getJSON(n, function(json){
      let j = i +1;
      
        msg += '<div class="pic_img">' +
                  // '<div>' +json.name + '</div>' +
                  // '<img src="'+ json.image +'" alt="" height="150">' +
                  // '<div>' +json.description + '</div>' +
                  // '<router-link to="/top"><img src="'+ json.image +'" alt="" height="250" width="350"></router-link>'+
                  '<a href="/src/#/show/'+ j +'"><img src="'+ json.image +'" alt="" height="250" width="350"></a>' +
                  // '<a href="/show?id='+ j +'"><img src="'+ json.image +'" alt="" height="250" width="350"></a>' +
                  // '<router-link to="/publish">Publish</router-link>'+
                '</div>';
                $('#pic_container').html(msg);
                
    });
    
  }
}

$(document).on("click", "#sell", function () {
  var price_input = document.getElementById('price_input').value
  var number = document.getElementById('number').innerText
  price_input = price_input * 1000000000000000000
  var id = Number(number) + 1
  console.log(price_input)
  console.log(id)
  contract.methods.addSellingItem(id,price_input)
        .send({ from: userAccount, gasLimit: "340000" })
        .on("transactionHash", function (_receipt) {
            alert("Now your picture is being sellingItem. txhash:" + _receipt);
            console.log("txhash: " + _receipt)
            //とりあえずトランザクション処理前に変更する
            //トランザクション承認前に次の処理が行われた場合はエラーになる
            //リロードすれば正しいデータ情報取得出来るのでとりあえずよしとする
            items[number].price = price_input/ 1000000000000000000;
            items[number].seller = userAccount;
            //リロード代わりの処理
            router.push('/market')
            router.push('/show/' +number)

        })
        .on("receipt", function (_receipt) {
            console.log(_receipt);
            
        })
        .on("error", function (_error) {
            console.log(_error);
        })
        $('.segment').dimmer('hide');
});

$(document).on("click", "#buy", function () {
  var price_val = document.getElementById('price_val').innerText
  var number = document.getElementById('number').innerText
  price_val = price_val * 1000000000000000000
  var id = Number(number) + 1
  console.log(price_val)
  console.log(id)
  contract.methods.purchaseSellingItem(id)
        .send({ from: userAccount, gasLimit: "340000", value: price_val })
        .on("transactionHash", function (_receipt) {
            alert("Purchasing process in progress. txhash:" + _receipt);
            console.log("txhash: " + _receipt)
            items[number].price = 0;
            items[number].seller = '';
            //リロード代わりの処理
            router.push('/market')
            router.push('/show/' +number)
        })
        .on("receipt", function (_receipt) {
            console.log(_receipt);
        })
        .on("error", function (_error) {
            console.log(_error);
        })
        $('.segment').dimmer('hide');

});

$(document).on("click", "#cancel", function () {
  
  var number = document.getElementById('number').innerText
  var id = Number(number) + 1
  console.log(id)
  contract.methods.cancelSellingItem(id)
        .send({ from: userAccount, gasLimit: "340000" })
        .on("transactionHash", function (_receipt) {
            alert("Canceling process in progress. txhash:" + _receipt);
            console.log("txhash: " + _receipt)
            items[number].price = 0;
            items[number].seller = '';
            //リロード代わりの処理
            router.push('/market')
            router.push('/show/' +number)
            
        })
        .on("receipt", function (_receipt) {
            console.log(_receipt);
        })
        .on("error", function (_error) {
            console.log(_error);
        })

        $('.segment').dimmer('hide');

});

$(document).on("click", "#test", function () {
    console.log(1)
    router.push('/market')
    router.push('/show/' +1)
})


