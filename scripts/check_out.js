
'use strict';


window.addEventListener('load',startup, false);
/**
 * 
 */
function startup() {

    //displays the current date
    document.getElementById('second').innerHTML=  today();
    document.getElementById('txtDateNow').value = today();

    $("#amount").val(Number(localStorage.getItem('estimated_total')));

    $("#customer-amount").text('$ '+$("#amount").val()+' CAD');

    // via local storage 
    let obj = JSON.parse(localStorage.getItem('userInfo'));
    
    if (obj) {
        // name
        $('#name').val(obj.fullName) ;
        fillInfo("name");

        // email
        $("#email-input").val(obj.emailAddress);
        fillInfo("email");

        // phone
        $("#phone").val(obj.phoneNumber);
        fillInfo("phone");

        // address
        $("#address").val(obj.street) ;
        fillInfo("address");

        // state
        if (obj.province== 'QC') {$("#state").val('Quebec');
        }else if (obj.province== 'AL'){$("#state").val( 'Alberta');
        }else if (obj.province== 'MA'){$("#state").val('Manitoba');
        }else if (obj.province== 'BC'){$("#state").val('British Columbia');
        }else if (obj.province== 'NB'){$("#state").val('New Brunswick');
        }else if (obj.province== 'NL'){$("#state").val('Newfoundland and Labrador');
        }else if (obj.province== 'NS'){$("#state").val('Nova Scotia');
        }else if (obj.province== 'ON'){$("#state").val('Ontario');
        }else if (obj.province== 'PE'){$("#state").val('Prince Edward Island');
        }else if (obj.province== 'SK'){$("#state").val('Saskatchewan');
        }else if (obj.province== 'NT'){$("#state").val('Northwest Territories');
        }else if (obj.province== 'NU'){$("#state").val('Nunavut');
        }else if (obj.province== 'YK'){$("#state").val('Yukon');
        }else {$("#state").val('');
        }
        fillInfo("state");

        // city
        $("#city").val(obj.city);
        fillInfo("city");

        // zip
        $("#zip").val(obj.postalCode);
        fillInfo("zip");

        let total_points = obj.totalPoint;
        $("#points").val(Number(total_points)) ;
        chooseLevel();
        $("#customer-points").text($("#points").val()) ;
        let newPoints = Math.floor(Number($("#amount").val()) /5);
        $("#customer-newPoints").text(newPoints);
        $("#customer-PointsAfterPayment").text(newPoints + Number($("#points").val())) ;

    }
    
    $('#form3').onsubmit = store;

}// end function startup

function store() {
  let key = new Date(); 
    if (validateForm()) {
        payment.points = Number($("#customer-PointsAfterPayment").text());

        JSON.parse(localStorage.setItem('userInfo').totalPoint) = Number($("#customer-PointsAfterPayment").text());

        window.localStorage.setItem(key, JSON.stringify(payment)); // converting object to string
    }
} // end function store 


/**
 * returns the current date
 */
function today() {
     // create an instance of the Date object
     let currentDate = new Date();
     //alert(currentDate);

     // extract date, month, and year from the current date variable
     let thisDate = currentDate.getDate();
     let thisMonth = currentDate.getMonth() +1;
     let thisYear = currentDate.getFullYear();

     // return the current date in the format mm/dd/yyyy
     let todayDate = thisMonth + '/' + thisDate + '/' + thisYear;
     return todayDate;
}// end function today

function sendEmailInvoice() { 
    if (validateForm()){
        $("#email-sent").text() = "<br> The invoice was sent to your email";
    }
}

// function handleSubmit() {
    
//     const cust_amount = $('#estimated_total').val();
    
//     // set the estimated_total into the local storage 
//     localStorage.setItem('Amount', cust_amount);
   
//     return;
// }

/**
 * validate user data entry
 */
function validateForm() {
    
   if ($("#name").val() === "") {
    
        window.alert('You must enter your name.');
        $("#name").focus();
        return false;
    } 
   else if ($("#email-input").val() === "") {
    
        window.alert('You must enter your email.');
        $("#email-input").focus();
        return false;
    }
   else if ($("#phone").val() === "") {
    
        window.alert('You must enter your phone.');
        $("#phone").focus();
        return false;
    }
   else if ($("#address").val() === "") {
        
            window.alert('You must enter your address.');
            $("#address").focus();
            return false;
    }
   else if ($("#state").val() === "") {
        
        window.alert('You must enter your state.');
        $("#state").focus();
        return false;
    }
    else if ($("#city").val() === "") {
        
        window.alert('You must enter your city.');
        $("#city").focus();
        return false;
    }
   else if ($("#zip").val() === "") {
            
        window.alert('You must enter your postal code.');
        $("#zip").focus();
        return false;
    }
   else if ($("#cardNumber").val() === "") {
                
        window.alert('You must enter your card number.');
        $("#cardNumber").focus();
        return false;
    }
    else if ($("#nameOnCard").val() === "") {
                    
        window.alert('You must enter your name on card.');
        $("#nameOnCard").focus();
        return false;
    }
    else if ($("#cvc").val() === "") {
                        
        window.alert('You must enter your card CVC / CVV.');
        $("#cvc").focus();
        return false;
    }
    else if ($("#expiryM").val() === "") {
                            
        window.alert('You must enter your card expiry month');
        $("#expiryM").focus();
        return false;
    }
    else if ($("#expiryY").val() === "") {
                                
        window.alert('You must enter your card expiry year');
        $("#expiryY").focus();
        return false;                                                      
    }

    $("#PaymentPaid").html("<br> Thank you  <br>Your payment has been processed <br>");
   
}// end function validateForm

function chooseLevel() {
    
    let levelImg='';
    let hisPoints = $('#points').val();
    let subTotal = Number($('#amount').val()) ;
    let discount = 0;

    document.getElementById('level').innerHTML =" &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp";

     if ( hisPoints > 25000 && hisPoints < 50000){// silver account
         discount = 0.05;
         levelImg ='<img src="images/check_out/sponsor_silver.png" width="100px" style=" text-align: right;">'
                    +"<br>5% Discount = $" + (subTotal * discount).toFixed(2) + " CAD";
            document.getElementById('customer-discount').innerHTML = "5% Discount = $ " + (subTotal * discount).toFixed(2) + " CAD";
        
         subTotal = subTotal - (subTotal * discount);
    } else if ((hisPoints >= 50000) && (hisPoints < 100000)) {// golden account
        discount = 0.1;
        levelImg = '<img src="images/check_out/sponsor_gold.png" width="100px" style=" text-align: right;">'
                    +"<br>10% Discount = $" + (subTotal * discount).toFixed(2) + " CAD";
        document.getElementById('customer-discount').innerHTML = "10% Discount = $ " + (subTotal * discount).toFixed(2) + " CAD";
      
                    subTotal = subTotal - (subTotal * discount);
    }else if (hisPoints >= 100000){// diamond account
        discount = 0.15;
        levelImg = '<img src="images/check_out/diamond-level.png" width="100px" style=" text-align: right;">'
                    +"<br>15% Discount = $" + (subTotal * discount).toFixed(2) + " CAD";
        document.getElementById('customer-discount').innerHTML = "15% Discount = $ " + (subTotal * discount).toFixed(2) + " CAD";
        
        subTotal -= (subTotal * discount);
    }else{
        document.getElementById('customer-discount').innerHTML = "";
    };

    let tax = subTotal * 0.05;
    let total = subTotal + tax;
    document.getElementById('level').innerHTML += levelImg 
            +"<br><br>&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; Sub Total = $"+ subTotal.toFixed(2) + " CAD"
           +"<br>&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; Tax = $" + tax.toFixed(2) + " CAD"
           +"<br>&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; Total = $" + total.toFixed(2) + " CAD";
    document.getElementById('customer-subTotal').innerHTML = " $"+ subTotal.toFixed(2) + " CAD";
    document.getElementById('customer-tax').innerHTML = " $"+ tax.toFixed(2) + " CAD";
    document.getElementById('customer-total').innerHTML = " $"+ total.toFixed(2) + " CAD";

}// end chooseLevel

const dialog = $("#myDialog");

let payment = {
        date: "",
        custName: "name",
        email : "email",
        phone : "phone",
        address : "address",
        state : "state",
        city : "city",
        zip : "zip",
        amount : 0,
        points : 0,
        cardNumber : "cardNumber",
        nameOnCard : "nameOnCard",
        cvc : "cvc",
        expiryM : 0,
        expiryY : 23
};

function fillInfo(fieldName){

    payment.date = new Date();

    if (fieldName == "name"){
        payment.custName = $("#name").val();
        $("#customer-name").text($("#name").val()) ;

    }else  if (fieldName == "email"){
        payment.email = $("#email-input").val();
        $("#customer-email").text($("#email-input").val()) ;
        
    }else  if (fieldName == "phone"){
        payment.phone = $("#phone").val();
        $("#customer-phone").text($("#phone").val());

    }else if (fieldName == "address"){
        payment.address = $("#address").val();
        $("#customer-address").text($("#address").val());
    
    }else if (fieldName == "state"){
        payment.state = $("#state").val();
        $("#customer-state").text($("#state").val());
    
    }else if (fieldName == "city"){
        payment.city = $("#city").val();
        $("#customer-city").text($("#city").val());
    
    }else if (fieldName == "zip"){
        payment.zip = $("#zip").val();
        $("#customer-zip").text($("#zip").val());

    }else if (fieldName == "amount"){
        payment.amount = $("#amount").val();
        $("#customer-amount").text('$ '+ $("#amount").val()+' CAD') ;
        $("#customer-newPoints").text(Math.floor(Number( $("#amount").val()) /5));

        $("#customer-PointsAfterPayment").text(Number( $("#customer-newPoints").text()) + Number($("#points").val())) ;

    }else if (fieldName == "points"){
        payment.points = $("#points").val();
        $("#customer-points").text($("#points").val());
        $("#customer-PointsAfterPayment").text(Number( $("#customer-newPoints").text()) + Number($("#points").val())) ;

        chooseLevel();
    
    }else if (fieldName == "cardNumber"){
        payment.cardNumber = $("#cardNumber").val();
        $("#customer-cardNumber").text($("#cardNumber").val());

    }else if (fieldName == "nameOnCard"){
        payment.nameOnCard = $("#nameOnCard").val();
        $("#customer-nameOnCard").text($("#nameOnCard").val());

    }else if (fieldName == "cvc"){
        payment.cvc = $("#cvc").val();
        $("#customer-cvc").text($("#cvc").val());

    }else if (fieldName == "expiryM"){
        payment.expiryM = $("#expiryM").val() ;

        if ($("#expiryM").val() < 10) {
            $("#customer-expiry").text('0'+ $("#expiryM").val() + '/' +$("#expiryY").val()) ;
        }else {
           $("#customer-expiry").text($("#expiryM").val()+ '/' + $("#expiryY").val());
        }
            
    }else if (fieldName == "expiryY"){
        payment.expiryY = $("#expiryY").val() ;
        
        if ($("#expiryM").val() < 10) {
            $("#customer-expiry").text('0'+ $("#expiryM").val() + '/' +$("#expiryY").val()) ;
        }else {
            $("#customer-expiry").text($("#expiryM").val()+ '/' + $("#expiryY").val());
        }
    }
}
                
