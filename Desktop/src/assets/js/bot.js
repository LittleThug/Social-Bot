//library import

const puppeteer = require("puppeteer");

// # set

const rash = "likeforlikes";

const url = "https://www.instagram.com/explore/tags/" + rash;

async function bot() {
  //User information

  const user = document.getElementById("login").value;

  const password = document.getElementById("pass").value;

  const value_like = document.getElementById("rangeValue").innerHTML;

  if (value_like > 72) {
    alert(
      "the like rate is over 72%, your account will be in danger of soft ban"
    );
  }

  const likerate = 100 - value_like;

  // Setting comments
  const comments = [];
  function setComments() {
    const CommentsValue = document.querySelectorAll("input.comment-input");
    CommentsValue.forEach(function (element) {
      const commentVal = element.value.trim();
      console.log(commentVal);
      comments.push(commentVal)
    });
  }
  //
  setComments();
  //variable set

  const browser = await puppeteer.launch({
    headless: false,
    args: [`--window-size=100,180`],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 })
  alert("You have iniciated the Bot");

  let l = 0;
  let c = 0;

  document.getElementById("account").innerText = user;

  document.getElementById("likes").innerText = l;
  document.getElementById("comments").innerText = c;

  document.getElementById("total").innerText = 0;

  //page get
  await page.goto("https://www.instagram.com/accounts/login/");

  await page.waitForSelector('input[name="username"]');

  //login

  await page.type('input[name="username"]', user);

  await page.type('input[name="password"]', password);

  await page.click('button[type="submit"]');

  console.log("Have loged in");

  await page.waitFor(3000);

  //go to a #

  await page.waitFor(4000);

  await page.goto(url);

  //photo selection

  await page.click("div.eLAPa");

  //photo

  for (i = 1; l < 500; i++) {
    var rand = Math.floor(Math.random() * 100) + 1;

    document.getElementById("total").innerText = i;

    if (rand >= likerate) {
      //like photo
      try {
        await page.waitFor(2000);
        
        await page.click("span.fr66n button.wpO6b");

        l++;

        document.getElementById("likes").innerText = l;
      } catch {
        await page.waitForSelector("a._65Bje");
        await page.click("a._65Bje");
      }
    }
    if (rand >=  80){
      let Commented = ''
      if (comments.length > 0) {
        const random = Math.floor(Math.random() * comments.length);
    
        const commentVal = comments[random].trim();
        if (commentVal && commentVal.length > 0) {  // If comment got anything only thn comment
          Commented = commentVal
        }
      }
    
      try {
        await page.waitFor(2000);

        await page.type('textarea[class="Ypffh"]', Commented);

        await page.click("form.X7cDz button.sqdOP");
        c++;
        document.getElementById("comments").innerText = c;
        
      } catch {
        await page.waitForSelector("a._65Bje");
        await page.click("a._65Bje");
      }
    }
    
    //skip photo

    await page.waitForSelector("a._65Bje");

    await page.waitFor(2000);

    await page.click("a._65Bje");
  }
  alert("Bot has finished");
  browser.close();
}

//signature G4lile0
//signature kgoel085
//signature LittleThug
