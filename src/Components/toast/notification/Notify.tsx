import React from 'react'

interface NotifiyProps{
    id: string,
    title: string,
    description: string,
    onRemove?: () => {},
    cta?: string,
    type?: string
}

const Notifiy: React.FC<NotifiyProps> = ({
    id='',
    title,
    description,
    onRemove = (id: string) => {},
    cta = '',
    type = 'alert'
}) => {

    function handleRemove(){
        onRemove(id)
    }

    return <div key={id} data-type={type} className='w-[340px] relative p-4 border-2 rounded-sm bg-[#f443361a]  border-[#f44336]'>
        <button onClick={handleRemove} className='absolute top-0 right-1/22 '>&times;</button>
        <div className='flex items-start w-9/10'>
            <div className='flex items-start gap-3'>
                <img width={20} height={20} src="https://e7.pngegg.com/pngimages/144/379/png-clipart-computer-icons-red-alert-angle-text-thumbnail.png" alt="" />
                <div className='toast-title-desc flex flex-col items-start gap-1'>
                    <span>{title}</span>
                    <span>{description}</span>
                </div>
            </div>
            <div className='w-full h-full'></div>
        </div>
        <div className='w-full h-1 absolute bottom-0 left-0 bg-red-500'></div>
    </div>
}

export default Notifiy;

//https://pngtree.com/freepng/security-alert-icon-red_5772817.html