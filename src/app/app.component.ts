import { Component } from '@angular/core';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Menu, MenuItemConstructorOptions, remote } from 'electron';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
})
export class AppComponent {
    public allHeroes: string[] = ['Hero1', 'Hero2', 'Hero3', 'Hero4'];
    public heroes: string[] = [];

    constructor() {
        this.getHeroes();
    }

    public getHeroes() {
        Promise.resolve().then(() => {
            this.heroes = this.allHeroes.slice();
        });
    }

    public restoreHeroes() {
        this.getHeroes();
    }

    public onMenu(hero: string) {
        const menu = this.initMenu(hero);
        menu.popup({});
    }

    private deleteHero(hero: string) {
        const index = this.heroes.indexOf(hero);
        console.log(index);

        Promise.resolve().then(() => {
            this.heroes.splice(index, 1);
            console.log(this.heroes);
        });
    }

    private initMenu(hero: string): Menu {
        const template: MenuItemConstructorOptions[] = [
            {
                label: `Delete ${hero}`,
                click: () => this.deleteHero(hero),
            },
        ];

        return remote.Menu.buildFromTemplate(template);
    }
}
