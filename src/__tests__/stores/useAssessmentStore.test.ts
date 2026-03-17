import { useAssessmentStore } from '../../stores/useAssessmentStore'

// Reset store before each test
beforeEach(() => {
  useAssessmentStore.getState().resetAssessment()
  useAssessmentStore.setState({
    locale: 'en',
    showTextLabels: true,
    showSubtitles: true,
  })
})

describe('useAssessmentStore', () => {
  describe('initial state', () => {
    it('should have correct default values', () => {
      const state = useAssessmentStore.getState()
      
      expect(state.locale).toBe('en')
      expect(state.ageGroup).toBeNull()
      expect(state.bodyPart).toBeNull()
      expect(state.symptom).toBeNull()
      expect(state.severity).toBeNull()
      expect(state.actionDecision).toBeNull()
      expect(state.urgencyLevel).toBeNull()
      expect(state.currentSubtitle).toBe('')
      expect(state.showTextLabels).toBe(true)
      expect(state.showSubtitles).toBe(true)
    })
  })

  describe('setLocale', () => {
    it('should set locale to German', () => {
      const { setLocale } = useAssessmentStore.getState()
      
      setLocale('de')
      
      expect(useAssessmentStore.getState().locale).toBe('de')
    })

    it('should set locale to Spanish', () => {
      const { setLocale } = useAssessmentStore.getState()
      
      setLocale('es')
      
      expect(useAssessmentStore.getState().locale).toBe('es')
    })

    it('should set locale to Turkish', () => {
      const { setLocale } = useAssessmentStore.getState()
      
      setLocale('tr')
      
      expect(useAssessmentStore.getState().locale).toBe('tr')
    })
  })

  describe('setAgeGroup', () => {
    it('should set age group to baby', () => {
      const { setAgeGroup } = useAssessmentStore.getState()
      
      setAgeGroup('baby')
      
      expect(useAssessmentStore.getState().ageGroup).toBe('baby')
    })

    it('should set age group to child', () => {
      const { setAgeGroup } = useAssessmentStore.getState()
      
      setAgeGroup('child')
      
      expect(useAssessmentStore.getState().ageGroup).toBe('child')
    })

    it('should set age group to teen', () => {
      const { setAgeGroup } = useAssessmentStore.getState()
      
      setAgeGroup('teen')
      
      expect(useAssessmentStore.getState().ageGroup).toBe('teen')
    })

    it('should allow setting age group to null', () => {
      const { setAgeGroup } = useAssessmentStore.getState()
      setAgeGroup('baby')
      
      setAgeGroup(null)
      
      expect(useAssessmentStore.getState().ageGroup).toBeNull()
    })
  })

  describe('setBodyPart', () => {
    it('should set body part to head', () => {
      const { setBodyPart } = useAssessmentStore.getState()
      
      setBodyPart('head')
      
      expect(useAssessmentStore.getState().bodyPart).toBe('head')
    })

    it('should set body part to chest', () => {
      const { setBodyPart } = useAssessmentStore.getState()
      
      setBodyPart('chest')
      
      expect(useAssessmentStore.getState().bodyPart).toBe('chest')
    })

    it('should allow setting body part to null', () => {
      const { setBodyPart } = useAssessmentStore.getState()
      setBodyPart('head')
      
      setBodyPart(null)
      
      expect(useAssessmentStore.getState().bodyPart).toBeNull()
    })
  })

  describe('setSymptom', () => {
    it('should set symptom to fever', () => {
      const { setSymptom } = useAssessmentStore.getState()
      
      setSymptom('fever')
      
      expect(useAssessmentStore.getState().symptom).toBe('fever')
    })

    it('should allow setting symptom to null', () => {
      const { setSymptom } = useAssessmentStore.getState()
      setSymptom('fever')
      
      setSymptom(null)
      
      expect(useAssessmentStore.getState().symptom).toBeNull()
    })
  })

  describe('setSeverity', () => {
    it('should set severity to low (1)', () => {
      const { setSeverity } = useAssessmentStore.getState()
      
      setSeverity(1)
      
      expect(useAssessmentStore.getState().severity).toBe(1)
    })

    it('should set severity to medium (2)', () => {
      const { setSeverity } = useAssessmentStore.getState()
      
      setSeverity(2)
      
      expect(useAssessmentStore.getState().severity).toBe(2)
    })

    it('should set severity to high (3)', () => {
      const { setSeverity } = useAssessmentStore.getState()
      
      setSeverity(3)
      
      expect(useAssessmentStore.getState().severity).toBe(3)
    })

    it('should allow setting severity to null', () => {
      const { setSeverity } = useAssessmentStore.getState()
      setSeverity(2)
      
      setSeverity(null)
      
      expect(useAssessmentStore.getState().severity).toBeNull()
    })
  })

  describe('setActionDecision', () => {
    it('should set action decision to wait', () => {
      const { setActionDecision } = useAssessmentStore.getState()
      
      setActionDecision('wait')
      
      expect(useAssessmentStore.getState().actionDecision).toBe('wait')
    })

    it('should set action decision to doctor', () => {
      const { setActionDecision } = useAssessmentStore.getState()
      
      setActionDecision('doctor')
      
      expect(useAssessmentStore.getState().actionDecision).toBe('doctor')
    })

    it('should allow setting action decision to null', () => {
      const { setActionDecision } = useAssessmentStore.getState()
      setActionDecision('wait')
      
      setActionDecision(null)
      
      expect(useAssessmentStore.getState().actionDecision).toBeNull()
    })
  })

  describe('setUrgencyLevel', () => {
    it('should set urgency level to routine', () => {
      const { setUrgencyLevel } = useAssessmentStore.getState()
      
      setUrgencyLevel('routine')
      
      expect(useAssessmentStore.getState().urgencyLevel).toBe('routine')
    })

    it('should set urgency level to urgent', () => {
      const { setUrgencyLevel } = useAssessmentStore.getState()
      
      setUrgencyLevel('urgent')
      
      expect(useAssessmentStore.getState().urgencyLevel).toBe('urgent')
    })

    it('should set urgency level to emergency', () => {
      const { setUrgencyLevel } = useAssessmentStore.getState()
      
      setUrgencyLevel('emergency')
      
      expect(useAssessmentStore.getState().urgencyLevel).toBe('emergency')
    })

    it('should allow setting urgency level to null', () => {
      const { setUrgencyLevel } = useAssessmentStore.getState()
      setUrgencyLevel('urgent')
      
      setUrgencyLevel(null)
      
      expect(useAssessmentStore.getState().urgencyLevel).toBeNull()
    })
  })

  describe('subtitle management', () => {
    it('should set current subtitle', () => {
      const { setCurrentSubtitle } = useAssessmentStore.getState()
      
      setCurrentSubtitle('Select the affected body part')
      
      expect(useAssessmentStore.getState().currentSubtitle).toBe('Select the affected body part')
    })

    it('should clear subtitle', () => {
      const { setCurrentSubtitle, clearSubtitle } = useAssessmentStore.getState()
      setCurrentSubtitle('Some subtitle')
      
      clearSubtitle()
      
      expect(useAssessmentStore.getState().currentSubtitle).toBe('')
    })
  })

  describe('toggleTextLabels', () => {
    it('should toggle showTextLabels from true to false', () => {
      const { toggleTextLabels } = useAssessmentStore.getState()
      expect(useAssessmentStore.getState().showTextLabels).toBe(true)
      
      toggleTextLabels()
      
      expect(useAssessmentStore.getState().showTextLabels).toBe(false)
    })

    it('should toggle showTextLabels from false to true', () => {
      useAssessmentStore.setState({ showTextLabels: false })
      const { toggleTextLabels } = useAssessmentStore.getState()
      
      toggleTextLabels()
      
      expect(useAssessmentStore.getState().showTextLabels).toBe(true)
    })
  })

  describe('toggleSubtitles', () => {
    it('should toggle showSubtitles from true to false', () => {
      const { toggleSubtitles } = useAssessmentStore.getState()
      expect(useAssessmentStore.getState().showSubtitles).toBe(true)
      
      toggleSubtitles()
      
      expect(useAssessmentStore.getState().showSubtitles).toBe(false)
    })

    it('should toggle showSubtitles from false to true', () => {
      useAssessmentStore.setState({ showSubtitles: false })
      const { toggleSubtitles } = useAssessmentStore.getState()
      
      toggleSubtitles()
      
      expect(useAssessmentStore.getState().showSubtitles).toBe(true)
    })
  })

  describe('resetAssessment', () => {
    it('should reset all assessment fields', () => {
      const { setAgeGroup, setBodyPart, setSymptom, setSeverity, setActionDecision, setUrgencyLevel, resetAssessment } = useAssessmentStore.getState()
      
      // Set all assessment fields
      setAgeGroup('baby')
      setBodyPart('head')
      setSymptom('fever')
      setSeverity(2)
      setActionDecision('wait')
      setUrgencyLevel('routine')
      
      // Reset
      resetAssessment()
      
      const state = useAssessmentStore.getState()
      expect(state.ageGroup).toBeNull()
      expect(state.bodyPart).toBeNull()
      expect(state.symptom).toBeNull()
      expect(state.severity).toBeNull()
      expect(state.actionDecision).toBeNull()
      expect(state.urgencyLevel).toBeNull()
    })

    it('should NOT reset accessibility settings', () => {
      const { setAgeGroup, setBodyPart, resetAssessment } = useAssessmentStore.getState()
      
      // Set some accessibility settings
      useAssessmentStore.setState({ showTextLabels: false, showSubtitles: false })
      setAgeGroup('child')
      setBodyPart('chest')
      
      // Reset
      resetAssessment()
      
      const state = useAssessmentStore.getState()
      expect(state.showTextLabels).toBe(false)
      expect(state.showSubtitles).toBe(false)
    })

    it('should NOT reset locale', () => {
      const { setLocale, setAgeGroup, resetAssessment } = useAssessmentStore.getState()
      
      setLocale('de')
      setAgeGroup('teen')
      
      resetAssessment()
      
      expect(useAssessmentStore.getState().locale).toBe('de')
    })
  })

  describe('full user journey', () => {
    it('should track complete assessment flow', () => {
      const store = useAssessmentStore.getState()
      
      // Start assessment
      store.setLocale('de')
      store.setAgeGroup('baby')
      store.setBodyPart('head')
      store.setSymptom('fever')
      store.setSeverity(2)
      store.setActionDecision('wait')
      store.setUrgencyLevel('routine')
      
      const state = useAssessmentStore.getState()
      expect(state.locale).toBe('de')
      expect(state.ageGroup).toBe('baby')
      expect(state.bodyPart).toBe('head')
      expect(state.symptom).toBe('fever')
      expect(state.severity).toBe(2)
      expect(state.actionDecision).toBe('wait')
      expect(state.urgencyLevel).toBe('routine')
    })

    it('should allow going back and changing selections', () => {
      const store = useAssessmentStore.getState()
      
      // Initial selection
      store.setAgeGroup('baby')
      store.setBodyPart('head')
      
      // Go back and change
      store.setBodyPart(null)
      store.setBodyPart('chest')
      
      expect(useAssessmentStore.getState().ageGroup).toBe('baby')
      expect(useAssessmentStore.getState().bodyPart).toBe('chest')
    })
  })
})
