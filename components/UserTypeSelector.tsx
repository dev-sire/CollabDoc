'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const UserTypeSelector = ({ userType, setUserType, onClickHandler }: UserTypeSelectorParams) => {

    const accessChangeHandler = (type: UserType) => {
        setUserType(type)
        onClickHandler && onClickHandler(type)
    }

  return (
    <Select value={userType} onValueChange={(type: UserType) => accessChangeHandler(type)}>
        <SelectTrigger className="shad-select">
            <SelectValue />
        </SelectTrigger>
        <SelectContent className="border-none bf-dark-200">
            <SelectItem value="viewer" className="shad-select-item">Can view</SelectItem>
            <SelectItem value="editor" className="shad-select-item">Can edit</SelectItem>
        </SelectContent>
    </Select>
  )
}

export default UserTypeSelector