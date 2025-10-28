function Link({children, className, link}) {
    return (
        <button className={className} >
            <a href={link}>{children}</a>
        </button>
    )
}

export default Link
