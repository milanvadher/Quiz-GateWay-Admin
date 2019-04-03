import { FuseConfig } from '@fuse/types';

/**
 * Default Fuse Configuration
 *
 * You can edit these options to change the default options. All these options also can be changed per component
 * basis. See `app/main/auth/login/login.component.ts` constructor method to learn more
 * about changing these options per component basis.
 */

export const fuseConfig: FuseConfig = {
    layout          : {
        style    : 'horizontal-layout-1',
        width    : 'fullwidth',
        navbar   : {
            background: 'mat-fuse-dark-700-bg',
            folded    : false,
            hidden    : false,
            position  : 'top',
            variant   : 'horizontal-style-1'
        },
        toolbar  : {
            background: 'mat-white-500-bg',
            hidden    : false,
            position  : 'above-static'
        },
        footer   : {
            background: 'mat-fuse-dark-900-bg',
            hidden    : true,
            position  : 'below-fixed'
        },
        sidepanel: {
            hidden  : true,
            position: 'right'
        }
    },
    customScrollbars: true
};
