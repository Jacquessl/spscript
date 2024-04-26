(async () => {
  let mapa = new Map();
  mapa.set("Skrzynia Pryzmatu 2", 2.01);
  mapa.set("Skrzynia Załamania", 0.85);
  mapa.set("Skrzynia Rewolucji", 1.08);
  mapa.set("Skrzynia Snów i koszmarów", 2.86);
  mapa.set("Skrzynia Ukąszenia Węża", 0.69);
  mapa.set("Skrzynia Odrzutu", 0.54);
  mapa.set("Skrzynia Clutch", 1.37);
  mapa.set("Skrzynia Strefy zagrożenia", 1.77);
  mapa.set("Skrzynia Pryzmatu", 1.62);
  mapa.set("Skrzynia Horyzontu", 2.11);
  mapa.set("Skrzynia CS20", 1.44);
  mapa.set("Skrzynia Falcjonu", 2.13);
  mapa.set("Skrzynia Cienia", 2.20);
  mapa.set("Skrzynia operacji Shattered Web", 5)
  let suma = 0;
  let last = "";
  let kupujemy = false;
  let lastPrice = 0;
  let setDodanych = new Set();
    while (true) {
      const offset = Math.random() + 1.2;
      await new Promise(r => setTimeout(r, 100));
      try {
        const itemContainers = document.querySelectorAll('div.CatalogPage-item--grid');
        var przycisk = document.querySelector('.LiveBtn');
        var przyciskZamknij = document.querySelector('.ButtonSimple');
        if (przycisk && !przycisk.classList.contains('LiveBtn--isActive')) {
          przycisk.click();
          if(suma == 0){
            setDodanych.clear();
          }
        }
        if(przyciskZamknij && suma == 0){
          //przyciskZamknij.click();
        }
        var countElement = document.querySelector('.CartButton-count');
        if (countElement) {
          var countValue = countElement.innerText || countElement.textContent;
          var intValue = parseInt(countValue, 10);
          if(intValue == 0){
              suma = 0;
          }
        }
        for (const container of itemContainers) {
          const nameElement = container.querySelector('div.ItemPreview-itemName');
          const curName = nameElement.textContent;
          const priceElement = container.querySelector('div.ItemPreview-priceValue');
          const discountElement = container.querySelector('div.GradientLabel.ItemPreview-discount');

          if (priceElement) {
            const currentPrice = parseFloat(priceElement.textContent.replace("zł", "").replace(",", "."));
             if(mapa.get(curName) > currentPrice){              
              if(!setDodanych.has(currentPrice)){
                const addToCartButton = container.querySelector('button.ItemPreview-mainAction');
                if (addToCartButton) {
                  addToCartButton.click();
                }
                suma+=currentPrice;
                last = curName;
                kupujemy = false;
                lastPrice = currentPrice;
              }
            }
            else if(discountElement){
              discountValue = parseInt(discountElement.textContent.match(/\d+/));
              if(!setDodanych.has(currentPrice)){
                if(currentPrice > 3 && discountValue >= 35 || currentPrice > 10 && discountValue >= 30){
                  const addToCartButton = container.querySelector('button.ItemPreview-mainAction');
                  if (addToCartButton) {
                    addToCartButton.click();
                  }
                  suma+=currentPrice;
                  last = curName;
                  kupujemy = false;
                  lastPrice = currentPrice;
                }
              }
            }
            else if(suma > 10){
              kupujemy = true;
            }
            if(last!=curName){
              setDodanych.add(lastPrice);
            }
  
            if (kupujemy) {
              while (true) {
                const offset = Math.random() + 1.2;
                await new Promise(r => setTimeout(r, 100 * offset));
                try {
                  const openCartButton = document.querySelector('div.HeaderContainer-cart button.CartButton-button');
                  if (openCartButton) {
                    openCartButton.click();

                    await new Promise(r => setTimeout(r, 500));

                    const checkoutButton = document.querySelector('div.CartDropdown-btns button.CartDropdown-checkout');


                    if (checkoutButton) {
                      checkoutButton.click();

                      await new Promise(resolve => {
                        const observer = new MutationObserver(() => {
                          if (window.location.href.includes('https://skinport.com/pl/cart')) {
                            observer.disconnect();
                            resolve();
                          }
                        });
                        observer.observe(document.body, { childList: true, subtree: true });
                      });

                      const checkboxToClick1 = document.querySelector('[id^="cb-tradelock-"]');
                      const checkboxToClick2 = document.querySelector('[id^="cb-cancellation-"]');
                      while(checkboxToClick2){
                        if(!checkboxToClick1){
                          checkboxToClick2.click();
                        }else{
                          checkboxToClick1.click();
                          checkboxToClick2.click();
                        }
                        const checkoutBtn = document.querySelector('button.SubmitButton.CartSummary-checkoutBtn');
                        if (checkoutBtn) {
                          checkoutBtn.click(); 
                        }
                        if(checkboxToClick2.checked){
                          await new Promise(resolve => setTimeout(resolve, 50));
                        }
                      }                  
                      break;
                    }
                  }
                } catch { null; }
              }
            }
            
            
          }
        }
      } catch { null; }
    }
  })();
