(async () => {
  let mapa = new Map();
  mapa.set("Skrzynia Pryzmatu 2", 2.4);
  mapa.set("Skrzynia Załamania", 1.4);
  mapa.set("Skrzynia Rewolucji", 2);
  mapa.set("Skrzynia Snów i koszmarów", 3);
  mapa.set("Skrzynia Ukąszenia Węża", 0.7);
  mapa.set("Skrzynia Odrzutu", 0.8);
  mapa.set("Skrzynia Clutch", 1.3);
  mapa.set("Skrzynia Strefy zagrożenia", 1.9);
  mapa.set("Skrzynia Pryzmatu", 1.9);
  mapa.set("Skrzynia Spektrum 2", 4.2);
  mapa.set("Skrzynia Horyzontu", 2.4);
  mapa.set("Skrzynia CS20", 1.8);
  mapa.set("Skrzynia Falcjonu", 2.4);
  mapa.set("Skrzynia Cienia", 2.4);
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
  
        for (const container of itemContainers) {
          const nameElement = container.querySelector('div.ItemPreview-itemName');
          const curName = nameElement.textContent;
          const priceElement = container.querySelector('div.ItemPreview-priceValue');
          const discountElement = container.querySelector('div.GradientLabel.ItemPreview-discount');

          if (priceElement) {
            const currentPrice = parseFloat(priceElement.textContent.replace("zł", "").replace(",", "."));
            let discountMatch = 1;
            if(discountElement){
              discountMatch = discountElement.textContent.match(/\d+/);
            }
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
            if(last!=curName && suma > 10){
              kupujemy = true;
            }
            if(last!=curName){
              setDodanych.add(lastPrice);
            }
            if (discountMatch) {
              const discountValue = parseInt(discountMatch[0]);
  
              if ((currentPrice > 10 && discountValue >= 30) || kupujemy) {
                const addToCartButton = container.querySelector('button.ItemPreview-mainAction');
                if (addToCartButton) {
                  if(!kupujemy){
                    addToCartButton.click();
                  }
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
                            break;
                        }
                      }
                    } catch { null; }
                  }
                }
              }
            }
          }
        }
      } catch { null; }
    }
  })();
