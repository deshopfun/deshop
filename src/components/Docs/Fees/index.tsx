import { Http } from '@/utils/http/http'
import DocsMarkdownPage from '../DocsMarkdownPage'

const DocsFees = () => (
  <DocsMarkdownPage
    title="Fees"
    description="Platform fee structure and details"
    url={Http.fees_md}
    emptyHint="The fees document could not be loaded."
  />
)

export default DocsFees
