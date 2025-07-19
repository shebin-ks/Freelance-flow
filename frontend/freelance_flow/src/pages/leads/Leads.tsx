import React, { useState } from 'react'
import PageHeader from '../../components/pages/PageHeader'
import Model from '../../components/Model'
import LeadDetail from './lead_detail/LeadDetail'
import AddLead from './add_lead/AddLead'
import UploadLeads from './add_lead/UploadLeads'

const Leads: React.FC = () => {

  const [isModelOpen, setIsModelOpen] = useState(false)

  const [isUpload, setIsUpload] = useState(false)
  return (
    <div className='mx-4 py-6 space-y-8 '>
      <PageHeader
        setIsModelOpen={setIsModelOpen}
        title="Lead Management"
        subtitle='Manage your leads and clients'
        btnText='Add Lead'
        uploadBtn='Upload Leads'
        setIsUpload={setIsUpload}
      />

      <LeadDetail />


      <Model isModelOpen={isModelOpen} >
        {isUpload ?
          <UploadLeads setIsModelOpen={setIsModelOpen}  setIsUpload={setIsUpload}/>
          :
          <AddLead setIsModelOpen={setIsModelOpen} />
        }
      </Model>
    </div>
  )
}

export default Leads