// Set the date we're counting down to


// date-DAY(date)+1+n*7-WEEKDAY(date-DAY(date)+8-dow)

// var deploy = nthWeekdayOfMonth(4, 2, new Date());
// var er_vi_klar = deploy.getDate() - 1;
// var dag_1 = deploy.getDate() + 1;
// var dag_2 = deploy.getDate() + 4;

// var ticketfreeze = deploy.getDate() - 15;
// var codefreeze = deploy.getDate() - 14;
// var test_dev_support = deploy.getDate() - 13;
// var status_på_test = deploy.getDate() - 10;
// var fixfreeze = deploy.getDate() - 9;


// document.getElementById("ticketfreeze").innerHTML = ticketfreeze;
// document.getElementById("codefreeze").innerHTML = codefreeze;
// document.getElementById("test-dev-support").innerHTML = test_dev_support;
// document.getElementById("status-på-test").innerHTML = status_på_test;
// document.getElementById("fixfreeze").innerHTML = fixfreeze;
// document.getElementById("dag-1").innerHTML = dag_1;
// document.getElementById("dag-2").innerHTML = dag_2;
// document.getElementById("deploy").innerHTML = deploy;
// document.getElementById("er-vi-klar").innerHTML = er_vi_klar;



// var deploy_date = deploy.getTime();

// // Update the count down every 1 second
// var x = setInterval(function() {

//   // Get today's date and time
//   var now = new Date().getTime();

//   // Find the distance between now and the count down date
//   var distance = deploy_date - now;

//   // Time calculations for days, hours, minutes and seconds
//   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//   var seconds = Math.floor((distance % (1000 * 60)) / 1000);

//   // Display the result in the element with id="demo"
//   document.getElementById("demo").innerHTML = days + "d " + hours + "h "
//   + minutes + "m " + seconds + "s ";

//   // If the count down is finished, write some text
//   if (distance < 0) {
//     clearInterval(x);
//     document.getElementById("demo").innerHTML = "EXPIRED";
//   }
// }, 1000);

// function nthWeekdayOfMonth(weekday, n, date) {
//   var date = new Date(date.getFullYear(), date.getMonth(), 1),
//       add = (weekday - date.getDay() + 7) % 7 + (n - 1) * 7;
//   date.setDate(1 + add);
//   return date;
// }





new Vue({
    el: '#q-app',
    data: function() {
        return {
            version: Quasar.version
        }
    },
    methods: {
        notify: function() {
            this.$q.notify('Running on Quasar v' + this.$q.version)
        }
    }
})
