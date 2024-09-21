import {Box, Tab, Tabs} from "@mui/material";
import {ReactNode, SyntheticEvent, useState} from "react";

interface ITabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number | string;
}

function CustomTabPanel(props: ITabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export interface ITab {
    label: string;
    children: ReactNode;
}

interface ITabListProps {
    tabs: ITab[];
}

export default function TabsList({tabs}: ITabListProps) {
    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (<Box sx={{width: '100%'}}>
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant={"scrollable"}
                scrollButtons={'auto'}
                allowScrollButtonsMobile
            >
                {tabs.map((tab, idx) => (
                    <Tab key={idx} label={tab.label} {...a11yProps(idx)} />
                ))}
            </Tabs>
        </Box>
        {tabs.map((tab, idx) => (
            <CustomTabPanel key={idx} value={value} index={idx}>
                {tab.children}
            </CustomTabPanel>
        ))}
    </Box>)
}