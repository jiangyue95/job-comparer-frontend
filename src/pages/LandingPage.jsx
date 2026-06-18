import { Link } from "react-router-dom"
import AnalysisResult from "../components/AnalysisResult"

const DEMO_RESULT = {
    matchScore: 75,
    matchedSkills: "Java, Spring Boot, Spring Security, RESTful API design, PostgreSQL, MySQL, Git, Docker, JUnit testing",
    missingSkills: "Integration testing, Microservices architecture, Message queues (Kafka or RabbitMQ), Kubernetes, CI/CD pipelines, Cloud platforms (AWS, GCP, Azure)",
    actionableFeedback: "You meet all the required technical skills for this Junior Java Backend Engineer role. Your Job Comparer project demonstrates solid Spring Boot experience with authentication, database management, and containerization. However, you only mention JUnit testing without showing concrete integration testing experience. Add a section to your CV showing specific integration tests you've written, particularly using Spring Boot Test annotations like @SpringBootTest, @WebMvcTest, or TestContainers for database integration tests. To strengthen your candidacy and stand out, address the missing 'nice to have' skills. Your current project is monolithic - refactor it or build a new project using microservices architecture with service-to-service communication. Add a message queue like RabbitMQ or Kafka to handle asynchronous processing between services. Set up a CI/CD pipeline using GitHub Actions or GitLab CI to automate builds, tests, and Docker image creation. Deploy your containerized application to a free-tier cloud platform (AWS ECS, GCP Cloud Run, or Azure Container Instances) and add Kubernetes experience by deploying to Minikube locally or a managed Kubernetes service. These additions would push your match score above 90 and demonstrate production-ready skills beyond junior level expectations.",
}

function LandingPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4 space-y-8">

                {/* Hero */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-gray-900">Job Comparer</h1>
                    <p className="text-lg text-gray-600">
                        AI-powered CV-to-job matching. See how well a CV fits a job in seconds.
                    </p>
                    <div className="flex items-center justify-center gap-3 pt-2">
                        <Link
                            to="/register"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-md transition-colors"
                        >
                            Get Started
                        </Link>
                        <Link
                            to="/login"
                            className="inline-block bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2 px-5 rounded-md transition-colors"
                        >
                            Login
                        </Link>
                    </div>
                </div>

                {/* Example intro */}
                <div className="space-y-1">
                    <h2 className="text-xl font-semibold text-gray-900">Here's an example analysis:</h2>
                    <p className="text-sm text-gray-600">
                        Example: matching a junior backend developer's CV (Java, Spring Boot, Docker) against a
                        "Junior Java Backend Engineer" job posting.
                    </p>
                </div>

                {/* Demo result (reuses the real component) */}
                <AnalysisResult result={DEMO_RESULT} />

                {/* Bottom CTA */}
                <div className="text-center space-y-3 pt-2">
                    <p className="text-gray-700">Want to analyze your own CV?</p>
                    <Link 
                        to="/register"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-md transition-colors"
                    >
                        Sign up - it's free
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default LandingPage