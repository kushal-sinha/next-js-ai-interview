import React, { ReactNode } from 'react'
import Header from './_components/Header';

interface DashboardLayoutProps {
    children: ReactNode
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
};

export default DashboardLayout;