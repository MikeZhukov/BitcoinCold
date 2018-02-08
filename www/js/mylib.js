//Functions
function displayId(id,displayType = 'block'){
    	var id = document.getElementById(id);
    	id.style.display = displayType;
    }
function hideId(id){
    	var id = document.getElementById(id);
    	id.style.display = 'none';
    }
function recursiveHash(baseData,recursiveNumber = 0){
    do{
    	baseData = bitcoin.crypto.sha256(baseData);
    	recursiveNumber--;
    }while(recursiveNumber >= 0);
    return baseData;
    }
function recursiveKeyPair(baseData,recursiveNumber = 0){
    return new bitcoin.ECPair(bigi.fromBuffer(recursiveHash(baseData,recursiveNumber)));
    }
function openPage(pageName,currentPage){
    hideId(currentPage);
    displayId(pageName);
    window.currentPage = pageName;
    }
function getAddressForm(){
      addressSubmit = recursiveKeyPair(fileContent,window.addressNumber);
      window.currentNumber = window.addressNumber;
      window.currentAddress = addressSubmit;
      var addressPlace = document.getElementById('qrAddress')
      addressPlace.innerHTML = '';
      var div = document.createElement('div');
      div.innerHTML = ('Address #'+window.addressNumber+': '+addressSubmit.getAddress());
      addressPlace.appendChild(div);
      var QRcode =  new QRCode(addressPlace,'bitcoin:' + addressSubmit.getAddress());
      displayId('privateKeyButton');
      hideId('qrKey');
    }
function getKeyForm(){
      var currentPrivateKey = window.currentAddress.toWIF();
      var keyPlace = document.getElementById('qrKey')
      keyPlace.innerHTML = '';
      var div = document.createElement('div');
      div.innerHTML = ('Key #'+window.currentNumber+': '+currentPrivateKey);
      keyPlace.appendChild(div);
      var QRcode =  new QRCode(keyPlace,currentPrivateKey);
      displayId('qrKey');
    }
function addChangeForm(){
      window.addChange = true;
      hideId('changeButton');
      displayId('amountToChange','inline');
      displayId('changeNumber','inline');
      displayId('removeChangeButton');
    }
function removeChangeForm(){
      window.addChange = false;
      hideId('removeChangeButton');
      hideId('amountToChange');
      hideId('changeNumber');
      displayId('changeButton');
    }
function buildTransactionForm(){
      var rawTx = new bitcoin.TransactionBuilder();
      rawTx.addInput(window.previousTxHash,window.previousTxIndex);
      rawTx.addOutput(window.depositAddress,window.amountToSend);
      if(window.addChange && window.amountToChange && window.changeNumber){
      var changeAddress = recursiveKeyPair(window.fileContent,window.changeNumber);
      rawTx.addOutput(changeAddress.getAddress(),window.amountToChange);}
      rawTx.sign(0,recursiveKeyPair(window.fileContent,window.withdrawalNumber));
      var readyTx = rawTx.build().toHex();
      var rawTxPlace = document.getElementById('qrRawTx')
      rawTxPlace.innerHTML = '';
      var div = document.createElement('div');
      div.innerHTML = (readyTx);
      rawTxPlace.appendChild(div);
      var QRcode =  new QRCode(rawTxPlace,readyTx);
    }
