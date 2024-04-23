export const appInfo = {
    version: 'V1.1'
};

export interface Page {
    icon:string;
    name:string;
    redirectTo: string;
}

export const routes: Page[] = [
    {
        icon: 'bar-chart',
        name: 'consulta de Saldo',
        redirectTo: '/balance'
    },
    /*{
        icon: 'radio',
        name: 'Consumo MIFI',
        redirectTo: '/balance-mifi'
    },*/
    {
        icon: 'help-circle',
        name: 'más información',
        redirectTo: '/info'
    },
    {
        icon: 'document-text',
        name: 'términos y condiciones',
        redirectTo: '/terms-conditions'
    },
    {
        icon: 'person',
        name: 'aviso de privacidad',
        redirectTo: '/notice-privacy'
    }
];