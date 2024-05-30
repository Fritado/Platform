import AdminDashboard from './components/views/superAdmin/SADasboard/AdminDashboard'
import Prompts from './components/views/superAdmin/Prompts/Prompts'
import UserManager from './components/views/superAdmin/User-Manager/UserManager'
import PackageManager from './components/views/superAdmin/PackageManager/PackageManager'
import PackageManagerAddForm from './components/views/superAdmin/PackageManager/PackageManagerAddForm'
import PackageEditForm from './components/views/superAdmin/PackageManager/PackageEditForm'

export const SAroutes = [
  { path: '/admin-dashboard', name: 'AdminDashboard', element: AdminDashboard },
  { path: '/prompts', name: 'Prompts', element: Prompts },
  { path: '/admin/user-manager', name: 'UserManager', element: UserManager },
  { path: '/admin/package-manager', name: 'PackageManager', element: PackageManager },
  { path: '/admin/package-edit-form', name: 'PackageEditForm', element: PackageEditForm },
  { path: '/admin/package-manager-add-package', name: 'PackageManagerAddForm', element: PackageManagerAddForm },
]

export default SAroutes
