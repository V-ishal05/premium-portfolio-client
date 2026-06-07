import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { getDashboardAnalytics } from "../utils/analyticsApi";
import "../styles/AdminAnalytics.css";


function AdminAnalytics() {
    const [analytics, setAnalytics] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics =
        async () => {
            try {
                const response =
                    await getDashboardAnalytics();

                if (
                    response.success
                ) {
                    setAnalytics(
                        response
                    );
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };


    if (loading) {
        return (
            <div className="admin-dashboard">
                <AdminSidebar />

                <main className="admin-main">
                    <h2>
                        Loading Analytics...
                    </h2>
                </main>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <AdminSidebar />

            <main className="admin-main">
                <div className="dashboard-header">
                    <div>
                        <h1>
                            Analytics Dashboard
                        </h1>

                        <p>
                            Portfolio insights,
                            recruiter activity,
                            engagement and
                            performance reports.
                        </p>
                    </div>
                </div>

                {/* KPI CARDS */}

                <div className="analytics-grid">
                    <div className="analytics-card">
                        <h3>
                            👁 Portfolio Views
                        </h3>

                        <div className="analytics-value">
                            {
                                analytics?.analytics
                                    ?.portfolioViews || 0
                            }
                        </div>
                    </div>

                    <div className="analytics-card">
                        <h3>
                            🎯 Recruiter Visits
                        </h3>

                        <div className="analytics-value">
                            {
                                analytics?.analytics
                                    ?.recruiterVisits || 0
                            }
                        </div>
                    </div>

                    <div className="analytics-card">
                        <h3>
                            📄 Resume Downloads
                        </h3>

                        <div className="analytics-value">
                            {
                                analytics?.analytics
                                    ?.resumeDownloads || 0
                            }
                        </div>
                    </div>

                    <div className="analytics-card">
                        <h3>
                            📩 Total Messages
                        </h3>

                        <div className="analytics-value">
                            {
                                analytics?.crm
                                    ?.totalMessages || 0
                            }
                        </div>
                    </div>
                    <div className="analytics-card">
                        <h3>
                            📈 Conversion Rate
                        </h3>

                        <div className="analytics-value">
                            {
                                analytics?.analytics
                                    ?.recruiterVisits > 0
                                    ? Math.round(
                                        (
                                            analytics.crm.totalMessages /
                                            analytics.analytics.recruiterVisits
                                        ) * 100
                                    )
                                    : 0
                            }
                            %
                        </div>
                    </div>
                </div>

                {/* CRM ANALYTICS */}

                <div className="priority-grid">
                    <div className="analytics-card">
                        <h3>
                            📬 Unread Messages
                        </h3>

                        <div className="analytics-value">
                            {
                                analytics?.crm
                                    ?.unreadMessages || 0
                            }
                        </div>
                    </div>

                    <div className="analytics-card">
                        <h3>
                            ✅ Read Messages
                        </h3>

                        <div className="analytics-value">
                            {
                                analytics?.crm
                                    ?.readMessages || 0
                            }
                        </div>
                    </div>

                    <div className="analytics-card">
                        <h3>
                            🗄 Archived Messages
                        </h3>

                        <div className="analytics-value">
                            {
                                analytics?.crm
                                    ?.archivedMessages || 0
                            }
                        </div>
                    </div>
                </div>

                {/* PERFORMANCE SUMMARY */}

                <div
                    className="analytics-card"
                    style={{
                        marginTop: "30px",
                    }}
                >
                    <h3>
                        📈 Performance Summary
                    </h3>

                    <p>
                        Total Recruiter
                        Interactions:
                        {" "}
                        {
                            analytics?.crm
                                ?.totalMessages || 0
                        }
                    </p>

                    <p>
                        Active Recruiter
                        Leads:
                        {" "}
                        {
                            analytics?.crm
                                ?.unreadMessages || 0
                        }
                    </p>

                    <p>
                        Resume Downloads:
                        {" "}
                        {
                            analytics?.analytics
                                ?.resumeDownloads || 0
                        }
                    </p>
                </div>


                {/* PRIORITY ANALYTICS */}
                <div className="analytics-priority-section">
                    <div className="analytics-card">
                        <h3>
                            📊 Recruiter Priority Distribution
                        </h3>

                        <div className="priority-bar-item">
                            <div className="priority-label">
                                Immediate
                            </div>

                            <div className="priority-bar">
                                <div
                                    className="priority-fill immediate-fill"
                                    style={{
                                        width: `${(
                                            (analytics?.crm
                                                ?.immediateCount ||
                                                0) * 20
                                        )
                                            }%`,
                                    }}
                                />
                            </div>

                            <span>
                                {
                                    analytics?.crm
                                        ?.immediateCount || 0
                                }
                            </span>
                        </div>

                        <div className="priority-bar-item">
                            <div className="priority-label">
                                High
                            </div>

                            <div className="priority-bar">
                                <div
                                    className="priority-fill high-fill"
                                    style={{
                                        width: `${(
                                            (analytics?.crm
                                                ?.highCount ||
                                                0) * 20
                                        )
                                            }%`,
                                    }}
                                />
                            </div>

                            <span>
                                {
                                    analytics?.crm
                                        ?.highCount || 0
                                }
                            </span>
                        </div>

                        <div className="priority-bar-item">
                            <div className="priority-label">
                                Medium
                            </div>

                            <div className="priority-bar">
                                <div
                                    className="priority-fill medium-fill"
                                    style={{
                                        width: `${(
                                            (analytics?.crm
                                                ?.mediumCount ||
                                                0) * 20
                                        )
                                            }%`,
                                    }}
                                />
                            </div>

                            <span>
                                {
                                    analytics?.crm
                                        ?.mediumCount || 0
                                }
                            </span>
                        </div>

                        <div className="priority-bar-item">
                            <div className="priority-label">
                                Low
                            </div>

                            <div className="priority-bar">
                                <div
                                    className="priority-fill low-fill"
                                    style={{
                                        width: `${(
                                            (analytics?.crm
                                                ?.lowCount ||
                                                0) * 20
                                        )
                                            }%`,
                                    }}
                                />
                            </div>

                            <span>
                                {
                                    analytics?.crm
                                        ?.lowCount || 0
                                }
                            </span>
                        </div>
                    </div>
                </div>
                <div className="analytics-grid">

                    <div className="analytics-card">
                        <h3>🟢 System Health</h3>

                        <p>Portfolio Website Active</p>
                        <p>Recruiter CRM Active</p>
                        <p>Resume Manager Active</p>
                        <p>Analytics Service Active</p>
                    </div>

                    <div className="analytics-card">
                        <h3>🕒 Last Updated</h3>

                        <p>
                            {
                                analytics?.analytics?.updatedAt
                                    ? new Date(
                                        analytics.analytics.updatedAt
                                    ).toLocaleString()
                                    : "N/A"
                            }
                        </p>
                    </div>

                </div>
                <div className="priority-grid">
                    <div className="analytics-card">
                        <h3>
                            🚨 Immediate
                        </h3>

                        <div className="analytics-value">
                            {
                                analytics?.crm
                                    ?.immediateCount || 0
                            }
                        </div>
                    </div>

                    <div className="analytics-card">
                        <h3>
                            🔴 High
                        </h3>

                        <div className="analytics-value">
                            {
                                analytics?.crm
                                    ?.highCount || 0
                            }
                        </div>
                    </div>

                    <div className="analytics-card">
                        <h3>
                            🟡 Medium
                        </h3>

                        <div className="analytics-value">
                            {
                                analytics?.crm
                                    ?.mediumCount || 0
                            }
                        </div>
                    </div>

                    <div className="analytics-card">
                        <h3>
                            🟢 Low
                        </h3>

                        <div className="analytics-value">
                            {
                                analytics?.crm
                                    ?.lowCount || 0
                            }
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdminAnalytics;