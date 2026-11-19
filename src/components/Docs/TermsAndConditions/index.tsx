import { Http } from '@/utils/http/http'
import { ScrollText } from 'lucide-react'
import DocsMarkdownPage from '../DocsMarkdownPage'

const DocsTermsAndConditions = () => (
  <DocsMarkdownPage
    title="Terms and Conditions"
    description="Please read these terms carefully before using Deshop"
    url={Http.terms_and_conditions_md}
    emptyHint="The terms document could not be loaded."
    icon={ScrollText}
    iconWrapClassName="bg-purple-50"
    iconClassName="text-purple-500"
  />
)

export default DocsTermsAndConditions
