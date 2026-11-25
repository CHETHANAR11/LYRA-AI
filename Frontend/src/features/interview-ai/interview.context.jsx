import { createContext,useState } from "react";


export const InterviewContext = createContext()

export const InterviewProvider = ({ children }) => {
    const [loading, setLoading] = useState(false) // State to track loading status
    const [report, setReport] = useState(null)// State to store the current interview report
    const [reports, setReports] = useState([])// State to store all interview reports of the logged-in user

    return (
        <InterviewContext.Provider value={{ loading, setLoading, report, setReport, reports, setReports }}>
            {children}
        </InterviewContext.Provider>
    )
}