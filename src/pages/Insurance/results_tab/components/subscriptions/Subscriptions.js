import React, { useEffect, useState } from 'react'
import { authenticatedGetRequest } from '../../../../../api'
import './Subscriptions.css'
import { toast, Toaster } from 'sonner'
import { CircleCheck, CircleX } from 'lucide-react'

const Subscriptions = () => {
    const [insurances, setInsurances] = useState([])
    
    useEffect(() => {
        get_subscriptions()
    }, [])
    
    const get_subscriptions = async () => {
        try {
            const response = await authenticatedGetRequest('/insurance/results?status=complete')
            if (response.status === 200) {
                setInsurances(response.data)
            }
            else {
                toast.error("Unable to fetch your insurance requests")
                toast.error("Please check you internet connection and try again")
            }
        } catch (error) {
            console.error(error)
        }
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const handleReactivate = (id) => {
        // Implement reactivation logic here
        console.log('Reactivate insurance with ID:', id)
    }

    const handleDelete = (id) => {
        // Implement deletion logic here
        console.log('Delete insurance with ID:', id)
    }

    return (
        <div className="subscriptions-container">
            <Toaster richColors expand={true} />
            {insurances && insurances.length === 0 ? (
                <div className="placeholder-content">
                    <h2>No Active Subscriptions</h2>
                    <p>Your active insurance subscriptions will appear here</p>
                </div>
            ) : (
                <div className="table-container">
                    <table className="subscriptions-table">
                        <thead>
                            <tr>
                                <th>Insurance</th>
                                <th>Transaction ID</th>
                                <th>Date</th>
                                <th>Payment</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {insurances.map((insurance, index) => (
                                <tr key={index}>
                                    <td>{insurance.insurance_name}</td>
                                    <td>{insurance.transaction_id}</td>
                                    <td>{formatDate(insurance.created_at)}</td>
                                    <td className='insurance-payment-cell'>
                                        {
                                        insurance.has_paid
                                            ? <span className="payment-status paid"><CircleCheck size={18} /></span>
                                            : <span className="payment-status unpaid"><CircleX size={18} /></span>
                                        }
                                    </td>
                                    <td>{Number(insurance.total_cost).toLocaleString()} XAF</td>
                                    <td>
                                        <span className={`status-badge ${insurance.treatment_status}`}>
                                            {insurance.treatment_status}
                                        </span>
                                    </td>
                                    <td>
                                        <button 
                                            className="action-btn reactivate" 
                                            onClick={() => handleReactivate(insurance.id)}
                                        >
                                            Reactivate
                                        </button>
                                        <button 
                                            className="action-btn delete" 
                                            onClick={() => handleDelete(insurance.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default Subscriptions

