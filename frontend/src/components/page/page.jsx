import { Helmet, HelmetProvider } from 'react-helmet-async';

const page = (props) => {
  const { title, children } = props
  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        {children}
      </div>
    </HelmetProvider>
  )
}

export default page
