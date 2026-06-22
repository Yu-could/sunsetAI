import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    inviteCode: '',
    connectedParents: [],
    healthRecords: [],
    signInRecords: [],
    dietRecords: [],
    familyMessages: [],
    parentProfile: {},
    memoryRecords: [],
    connectedChildren: [],
    loginStatus: {
      isLoggedIn: false,
      role: '',
      username: ''
    },
    medicineRecords: [],
    medicineTakenRecords: [],
    sosRecords: [],
    scheduleRecords: [],
    userProfile: {},
    appSettings: {},
    realNameInfo: {},
    dialectRequests: []
  }),
  actions: {
    generateInviteCode() {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      let code = ''
      for (let i = 0; i < 4; i++) code += chars.charAt(Math.floor(Math.random() * chars.length))
      code += '-'
      for (let i = 0; i < 4; i++) code += chars.charAt(Math.floor(Math.random() * chars.length))
      this.inviteCode = code
      localStorage.setItem('sunsetai_invite_code', code)
      return code
    },
    loadInviteCode() {
      const code = localStorage.getItem('sunsetai_invite_code')
      if (code) {
        this.inviteCode = code
        return code
      }
      return this.generateInviteCode()
    },
    connectWithCode(code) {
      const storedCode = localStorage.getItem('sunsetai_invite_code')
      if (code === storedCode) {
        const parent = {
          name: '张妈妈',
          avatar: '👵',
          relation: '母亲',
          connectedAt: new Date().toISOString(),
          online: true
        }
        this.connectedParents.push(parent)
        localStorage.setItem('sunsetai_connected_parents', JSON.stringify(this.connectedParents))
        return true
      }
      return false
    },
    loadConnectedParents() {
      const data = localStorage.getItem('sunsetai_connected_parents')
      if (data) {
        this.connectedParents = JSON.parse(data)
      }
    },
    addSignInRecord(record) {
      this.signInRecords.push({
        ...record,
        timestamp: new Date().toISOString()
      })
      localStorage.setItem('sunsetai_signin_records', JSON.stringify(this.signInRecords))
    },
    loadSignInRecords() {
      const data = localStorage.getItem('sunsetai_signin_records')
      if (data) {
        this.signInRecords = JSON.parse(data)
      }
    },
    addDietRecord(record) {
      this.dietRecords.push({
        ...record,
        timestamp: new Date().toISOString()
      })
      localStorage.setItem('sunsetai_diet_records', JSON.stringify(this.dietRecords))
    },
    loadDietRecords() {
      const data = localStorage.getItem('sunsetai_diet_records')
      if (data) {
        this.dietRecords = JSON.parse(data)
      }
    },
    addHealthRecord(record) {
      this.healthRecords.push({
        ...record,
        timestamp: new Date().toISOString()
      })
      localStorage.setItem('sunsetai_health_records', JSON.stringify(this.healthRecords))
    },
    loadHealthRecords() {
      const data = localStorage.getItem('sunsetai_health_records')
      if (data) {
        this.healthRecords = JSON.parse(data)
      }
    },
    addMessage(message) {
      this.familyMessages.push({
        ...message,
        timestamp: new Date().toISOString()
      })
      localStorage.setItem('sunsetai_family_messages', JSON.stringify(this.familyMessages))
    },
    loadFamilyMessages() {
      const data = localStorage.getItem('sunsetai_family_messages')
      if (data) {
        this.familyMessages = JSON.parse(data)
      }
    },
    updateHealthScore(score) {
      this.parentProfile.healthScore = score
      localStorage.setItem('sunsetai_parent_profile', JSON.stringify(this.parentProfile))
    },
    loadParentProfile() {
      const data = localStorage.getItem('sunsetai_parent_profile')
      if (data) {
        this.parentProfile = JSON.parse(data)
      }
    },
    addMemoryRecord(record) {
      this.memoryRecords.push({
        ...record,
        timestamp: new Date().toISOString()
      })
      localStorage.setItem('sunsetai_memory_records', JSON.stringify(this.memoryRecords))
    },
    loadMemoryRecords() {
      const data = localStorage.getItem('sunsetai_memory_records')
      if (data) {
        this.memoryRecords = JSON.parse(data)
      }
    },
    deleteMemoryRecord(index) {
      this.memoryRecords.splice(index, 1)
      localStorage.setItem('sunsetai_memory_records', JSON.stringify(this.memoryRecords))
    },
    addConnectedChild(child) {
      this.connectedChildren.push({
        ...child,
        connectedAt: new Date().toISOString()
      })
      localStorage.setItem('sunsetai_connected_children', JSON.stringify(this.connectedChildren))
    },
    loadConnectedChildren() {
      const data = localStorage.getItem('sunsetai_connected_children')
      if (data) {
        this.connectedChildren = JSON.parse(data)
      }
    },
    setLoginStatus(status) {
      this.loginStatus = { ...status }
      localStorage.setItem('sunsetai_login_status', JSON.stringify(this.loginStatus))
    },
    loadLoginStatus() {
      const data = localStorage.getItem('sunsetai_login_status')
      if (data) {
        this.loginStatus = JSON.parse(data)
      }
    },
    logout() {
      this.loginStatus = {
        isLoggedIn: false,
        role: '',
        username: ''
      }
      localStorage.removeItem('sunsetai_login_status')
    },
    addMedicineRecord(record) {
      this.medicineRecords.push(record)
      localStorage.setItem('sunsetai_medicine_records', JSON.stringify(this.medicineRecords))
    },
    loadMedicineRecords() {
      const data = localStorage.getItem('sunsetai_medicine_records')
      if (data) {
        this.medicineRecords = JSON.parse(data)
      }
    },
    saveMedicineRecords() {
      localStorage.setItem('sunsetai_medicine_records', JSON.stringify(this.medicineRecords))
    },
    addMedicineTakenRecord(record) {
      this.medicineTakenRecords.push({
        ...record,
        takenAt: new Date().toISOString()
      })
      localStorage.setItem('sunsetai_medicine_taken_records', JSON.stringify(this.medicineTakenRecords))
    },
    loadMedicineTakenRecords() {
      const data = localStorage.getItem('sunsetai_medicine_taken_records')
      if (data) {
        this.medicineTakenRecords = JSON.parse(data)
      }
    },
    addSOSRecord(record) {
      this.sosRecords.push({
        ...record,
        timestamp: new Date().toISOString()
      })
      localStorage.setItem('sunsetai_sos_records', JSON.stringify(this.sosRecords))
    },
    loadSOSRecords() {
      const data = localStorage.getItem('sunsetai_sos_records')
      if (data) {
        this.sosRecords = JSON.parse(data)
      }
    },
    addScheduleRecord(record) {
      this.scheduleRecords.push(record)
      localStorage.setItem('sunsetai_schedule_records', JSON.stringify(this.scheduleRecords))
    },
    loadScheduleRecords() {
      const data = localStorage.getItem('sunsetai_schedule_records')
      if (data) {
        this.scheduleRecords = JSON.parse(data)
      }
    },
    deleteScheduleRecord(index) {
      this.scheduleRecords.splice(index, 1)
      localStorage.setItem('sunsetai_schedule_records', JSON.stringify(this.scheduleRecords))
    },
    saveUserProfile(profile) {
      this.userProfile = { ...profile }
      localStorage.setItem('sunsetai_user_profile', JSON.stringify(this.userProfile))
    },
    loadUserProfile() {
      const data = localStorage.getItem('sunsetai_user_profile')
      if (data) {
        this.userProfile = JSON.parse(data)
      }
    },
    saveAppSettings(settings) {
      this.appSettings = { ...settings }
      localStorage.setItem('sunsetai_app_settings', JSON.stringify(this.appSettings))
    },
    loadAppSettings() {
      const data = localStorage.getItem('sunsetai_app_settings')
      if (data) {
        this.appSettings = JSON.parse(data)
      }
    },
    saveRealNameInfo(info) {
      this.realNameInfo = { ...info }
      this.userProfile = {
        ...this.userProfile,
        realName: info.realName,
        idCard: info.idCard,
        gender: info.gender,
        birthDate: info.birthDate,
        age: info.age,
        bloodType: info.bloodType,
        allergy: info.allergy,
        height: info.height,
        weight: info.weight,
        medicationNote: info.medicationNote,
        healthConditions: info.healthConditions,
        emergencyContact: info.emergencyContact,
        emergencyPhone: info.emergencyPhone,
        emergencyRelation: info.emergencyRelation,
        address: info.address,
        livingStatus: info.livingStatus,
        avatar: info.avatar
      }
      localStorage.setItem('sunsetai_realname_info', JSON.stringify(this.realNameInfo))
      localStorage.setItem('sunsetai_user_profile', JSON.stringify(this.userProfile))
    },
    loadRealNameInfo() {
      const data = localStorage.getItem('sunsetai_realname_info')
      if (data) {
        this.realNameInfo = JSON.parse(data)
      }
    },
    updateUsername(username) {
      this.userProfile = {
        ...this.userProfile,
        username: username
      }
      localStorage.setItem('sunsetai_user_profile', JSON.stringify(this.userProfile))
    },
    addDialectRequest(request) {
      this.dialectRequests.push({
        ...request,
        id: Date.now(),
        status: 'pending',
        createdAt: new Date().toISOString()
      })
      localStorage.setItem('sunsetai_dialect_requests', JSON.stringify(this.dialectRequests))
    },
    loadDialectRequests() {
      const data = localStorage.getItem('sunsetai_dialect_requests')
      if (data) {
        this.dialectRequests = JSON.parse(data)
      }
    },
    approveDialectRequest(id) {
      const request = this.dialectRequests.find(r => r.id === id)
      if (request) {
        request.status = 'approved'
        request.approvedAt = new Date().toISOString()
        localStorage.setItem('sunsetai_dialect_requests', JSON.stringify(this.dialectRequests))
      }
    },
    rejectDialectRequest(id) {
      const request = this.dialectRequests.find(r => r.id === id)
      if (request) {
        request.status = 'rejected'
        request.rejectedAt = new Date().toISOString()
        localStorage.setItem('sunsetai_dialect_requests', JSON.stringify(this.dialectRequests))
      }
    },
    deleteDialectRequest(id) {
      this.dialectRequests = this.dialectRequests.filter(r => r.id !== id)
      localStorage.setItem('sunsetai_dialect_requests', JSON.stringify(this.dialectRequests))
    },
    clearAllData() {
      localStorage.removeItem('sunsetai_invite_code')
      localStorage.removeItem('sunsetai_connected_parents')
      localStorage.removeItem('sunsetai_signin_records')
      localStorage.removeItem('sunsetai_diet_records')
      localStorage.removeItem('sunsetai_health_records')
      localStorage.removeItem('sunsetai_family_messages')
      localStorage.removeItem('sunsetai_parent_profile')
      localStorage.removeItem('sunsetai_memory_records')
      localStorage.removeItem('sunsetai_connected_children')
      localStorage.removeItem('sunsetai_login_status')
      localStorage.removeItem('sunsetai_medicine_records')
      localStorage.removeItem('sunsetai_medicine_taken_records')
      localStorage.removeItem('sunsetai_sos_records')
      localStorage.removeItem('sunsetai_schedule_records')
      localStorage.removeItem('sunsetai_user_profile')
      localStorage.removeItem('sunsetai_app_settings')
      localStorage.removeItem('sunsetai_realname_info')
      localStorage.removeItem('sunsetai_dialect_requests')
      this.inviteCode = ''
      this.connectedParents = []
      this.healthRecords = []
      this.signInRecords = []
      this.dietRecords = []
      this.familyMessages = []
      this.parentProfile = {}
      this.memoryRecords = []
      this.connectedChildren = []
      this.loginStatus = {
        isLoggedIn: false,
        role: '',
        username: ''
      }
      this.medicineRecords = []
      this.medicineTakenRecords = []
      this.sosRecords = []
      this.scheduleRecords = []
      this.userProfile = {}
      this.appSettings = {}
      this.dialectRequests = []
    }
  }
})
