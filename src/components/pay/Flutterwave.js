import React from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useLocalStorage from '../../lib/LocalStorage';

export default function FlutterWaveButton({ amount, transaction_id }) {
    const [user, setUser] = useLocalStorage('user')

    const config = {
        public_key: "FLWPUBK-38d1cbae1cb20293a6a70c0326721dc1-X",
        tx_ref: transaction_id,
        amount: amount,
        currency: 'XAF',
        payment_options: 'card,mobilemoney',
        redirect_url: '/payment-status',
        customer: {
            email: user?.user?.email || 'contact@harpiecm.com',
            phone_number: user?.user?.phone || '***********',
            name: user?.user?.first_name + " " + user?.user?.last_name,
        },
        customizations: {
            title: 'Harpie Payment',
            description: 'Subscription for insurance plan',
            logo: '',
        },
    };

    const handleFlutterPayment = useFlutterwave(config)

    const { t } = useTranslation()
    return (
        <div className="sd">

            <button
                onClick={() => {
                    handleFlutterPayment({
                        callback: (response) => {
                            closePaymentModal()
                        },
                        onClose: () => { },

                    });
                }}
            >
                Pay with Flutterwave
            </button>
        </div>
    );
}