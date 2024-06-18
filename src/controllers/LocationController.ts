
import { Request, Response } from "express";
import { Builder, Browser, By, Key, until } from "selenium-webdriver"


export const LocationController = {
    getLocation: async ( req: Request, res: Response ) => {
        const { q } = req.query;
        let result: string[] = [];

        let driver = await new Builder().forBrowser(Browser.FIREFOX).build();
        try {
            await driver.get("https://www.bing.com/maps");
            // await driver.manage().setTimeouts({ implicit: 12 });
            console.log("...");

            let input = await driver.findElement(By.id("maps_sb"))
            await input.sendKeys(q as string);
            await input.sendKeys(Key.SHIFT);

            await driver.executeScript("document.getElementById('sb_as_container').setAttribute('style', 'display:block')");
            await driver.executeScript("document.getElementById('as_containerSearch_maps_sb').setAttribute('style', 'visibility:visible')");

            let ele = await driver.findElement(By.id("taskBarContainer"));
            let ele2 = await ele.findElement(By.className("taskBar"));
            let ele3 = await ele2.findElement(By.css("ul"));
            let ele4 = await ele3.findElement(By.className("inputbox"));
            let ele5 = await ele4.findElement(By.id("maps_sb_container"));
            let ele6 = await ele5.findElement(By.className("sb_as_container"));
            await driver.wait(until.elementIsVisible(ele6), 2000);

            let ele7 = await ele6.findElement(By.id("as_containerSearch_maps_sb"));
            let ele8 = await ele7.findElement(By.xpath("//div[contains(@class, 'b_cards asOuterContainer')]"))
            await driver.wait(until.elementIsEnabled(ele8), 10000);

            let ele9 = await ele8.findElement(By.xpath("//ul[contains(@role, 'none')]"));

            let ele10 = await ele9.findElements(By.css("li"));

            for ( const i in ele10 ) {
                let data = await ele10[i].findElements(By.className("as_suggestion_root_inside"));

                for ( const j in data ) {
                    let data2 = await data[j].findElement(By.className("as_lines_root")); 
                    let data3 = await data2.findElements(By.css("p"));

                    result.push( await data3[0].getText() + " " + await data3[1].getText() )
                }
            }

            console.log("... ...");

            // await driver.wait(until.elementLocated, 1000);
        } catch (err) {
            res.json({ error: err })
            return;
        } finally {
            await driver.quit();
        }

        res.json({ data: result })
        return;
    }
}

// id="TaskBarSearch-as-2" 
// aria-label="Riomar Fortaleza, Rua Lauro Nogueira 1500, Fortaleza-Ceará, Brazil, item 1"
