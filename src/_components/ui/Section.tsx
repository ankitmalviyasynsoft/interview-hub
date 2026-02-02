
import React from 'react';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    fullWidth?: boolean;
}

export function Section({
    children,
    className = '',
    fullWidth = false,
    ...props
}: SectionProps) {
    return (
        <section
            className={`py-8 md:py-12 ${className}`}
            {...props}
        >
            <div className={fullWidth ? 'w-full' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}>
                {children}
            </div>
        </section>
    );
}
