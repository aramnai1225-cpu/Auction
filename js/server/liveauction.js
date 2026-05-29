let currentBid = 7500;

let timeLeft = 30;

let auctionEnded = false;

function increaseBid(){

    if(auctionEnded){
        return;
    }

    currentBid += 100;

    document.getElementById(
    "bidPrice"
    ).innerHTML = currentBid;

    timeLeft = 30;
}

//Timer
setInterval(function(){

    if(auctionEnded){
        return;
    }

    timeLeft--;

    document.getElementById(
    "timer"
    ).innerHTML = timeLeft;

    if(timeLeft <= 0){

        auctionEnded = true;

        alert(
        "Auction Ended!\nSold for €"
        + currentBid
        );

        addToCart(
        "Honda Fit",
        currentBid
        );
    }

},1000);