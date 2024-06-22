const FormRowSelect = ({name, labelText, list, defaultValue = '', onChange}) => {
    return (
        <div className="form-row">
            <label htmlFor={name} className="form-label">{labelText || name}</label>
            <select name={name} id={name} className="form-select" defaultValue={defaultValue} onChange={onChange}>
                {list.map(value => {
                    return (
                        <option key={value} value={value}>{value}</option>
                    );
                })}
            </select>
        </div>
    );
}



export default FormRowSelect;