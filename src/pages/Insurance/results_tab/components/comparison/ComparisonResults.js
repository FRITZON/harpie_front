import React, { useEffect, useState } from 'react'
import { Calendar, Filter, Search } from 'lucide-react'
import { authenticatedGetRequest } from '../../../../../api'
import { DateRangePicker } from '../../DateRangePicker'
import { toast, Toaster } from 'sonner'

const ComparisonResults = () => {

    const [insurances, setInsurances] = useState([])
    const [activeTab, setActiveTab] = useState('results')
    const [selectedInsurance, setSelectedInsurance] = useState('')
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    const insuranceTypes = [
        { value: "all", label: "All Insurance Types" },
        { value: "vehicle", label: "Vehicle Insurance" },
        { value: "health", label: "Health Insurance" },
        { value: "life", label: "Life Insurance" },
        { value: "death", label: "Death Insurance" },
        { value: "house", label: "House Insurance" },
        { value: "business", label: "Business Insurance" },
        { value: "travel", label: "Travel Insurance" },
    ]

    useEffect(() => {
        get_subscriptions()
    }, [])

    const get_subscriptions = async () => {
        try {
            const response = await authenticatedGetRequest('/insurance/results?status=pending')
            console.log('my insurances --------', response)
            if (response.status === 200) {

            }
            else {
                toast.error("Unable to fetch your insurance requests")
                toast.error("Please check you internet connection and try again")
            }
            setInsurances(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Toaster richColors expand={true}  />
            <div className="tab-content">
                <div className="filters-container">
                    <div className="search-filters">
                        <div className="filter-group">
                            <div className="custom-select">
                                <button
                                    className="select-button"
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                >
                                    <Filter className="filter-icon" />
                                    <span>{selectedInsurance ? insuranceTypes.find(t => t.value === selectedInsurance)?.label : 'Insurance Type'}</span>
                                </button>
                                {isFilterOpen && (
                                    <div className="select-dropdown">
                                        {insuranceTypes.map((type) => (
                                            <div
                                                key={type.value}
                                                className="select-option"
                                                onClick={() => {
                                                    setSelectedInsurance(type.value)
                                                    setIsFilterOpen(false)
                                                }}
                                            >
                                                {type.label}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="filter-group">
                            <DateRangePicker />
                        </div>

                        <div className="search-box">
                            <Search className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search results..."
                                className="search-input"
                            />
                        </div>
                    </div>
                </div>

                <div className="placeholder-content">
                    <h2>Comparison Results</h2>
                    <p className="text-muted">Your insurance comparison results will appear here</p>
                </div>
            </div>

        </>
    )
}

export default ComparisonResults
