import { Http } from '@/utils/http/http'
import { ShieldCheck } from 'lucide-react'
import DocsMarkdownPage from '../DocsMarkdownPage'

const DocsPrivacyPolicy = () => (
  <DocsMarkdownPage
    title="Privacy Policy"
    description="How we collect, use, and protect your data"
    url={Http.privacy_policy_md}
    emptyHint="The privacy policy could not be loaded."
    icon={ShieldCheck}
    iconWrapClassName="bg-green-50"
    iconClassName="text-green-500"
  />
)

export default DocsPrivacyPolicy
