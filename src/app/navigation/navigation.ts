import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        type     : 'group',
        children : [
            {
                id      : 'dashboard',
                title   : 'Dashboard',
                type    : 'item',
                icon    : 'dashboard',
                url     : '/dashboard'
            },
            {
                id      : 'user',
                title   : 'Users',
                type    : 'collapsable',
                icon    : 'person',
                children: [
                    {
                        id   : 'list',
                        title: 'User List',
                        type : 'item',
                        url  : '/user/list'
                    },
                    {
                        id   : 'create',
                        title: 'User Create',
                        type : 'item',
                        url  : '/user/create'
                    }
                ]
            },
            {
                id      : 'level',
                title   : 'Levels',
                type    : 'collapsable',
                icon    : 'reorder',
                children: [
                    {
                        id   : 'list',
                        title: 'Level List',
                        type : 'item',
                        url  : '/level/list'
                    },
                    {
                        id   : 'create',
                        title: 'Level Create',
                        type : 'item',
                        url  : '/level/create'
                    }
                ]
            },
        ]
    }
];
