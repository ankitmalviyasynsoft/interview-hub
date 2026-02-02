import React from 'react';
import { CustomerProfileComponent } from '@/_components/customer/profile/CustomerProfile/CustomerProfile.component';

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-background/50">
            <div className="container mx-auto py-8">
                <CustomerProfileComponent />
            </div>
        </div>
    );
}
