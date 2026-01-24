
'use client'

import { Toaster as SonnerToaster } from 'sonner'

export function NotificationToast() {
    return (
        <SonnerToaster
            position="top-right"
            expand={true}
            richColors
            theme="dark" // Using dark theme for Premium feel
            toastOptions={{
                style: {
                    background: 'rgba(20, 20, 20, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'white',
                }
            }}
        />
    )
}
