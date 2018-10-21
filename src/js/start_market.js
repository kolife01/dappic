
// window.addEventListener('load', function () {
//   checkweb3()
//   startApp()
//   startMarket()
//   // $('.segment').dimmer('show');
//   // $('.segment').dimmer('hide');

// })

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




