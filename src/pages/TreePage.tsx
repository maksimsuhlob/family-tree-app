import React from 'react';
import {useTranslation} from "react-i18next";

// const orgChart = [
//     {
//         name: 'CEO',
//         children: [
//             {
//                 name: 'Manager',
//             },
//         ]
//     },
//     {
//         name: 'CEO1',
//         children: [
//             {
//                 name: 'Manager',
//             },
//         ],
//     },
// ]

function TreePage() {
    const {t}=useTranslation()
    return (
        <div className="home" style={{
            height: '80vh',
            width: '100%'
        }}>
            {t('test')}
        </div>
    );
}

export default TreePage;
