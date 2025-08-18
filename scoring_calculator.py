#!/usr/bin/env python3
"""
Non-LLM AI Project Evaluation Calculator

This script provides deterministic scoring based on structured inputs
without requiring any LLM or subjective interpretation.
"""

import json
from typing import Dict, List, Tuple

class ProjectEvaluator:
    """Deterministic project evaluation calculator."""
    
    def __init__(self):
        self.weights = {
            'technical_complexity': 0.15,
            'resource_requirements': 0.15, 
            'implementation_risk': 0.10,
            'business_impact': 0.25,
            'scalability_potential': 0.20,
            'implementation_timeline': 0.15
        }
        
        self.risk_weights = {
            'technical_complexity': 0.375,
            'resource_requirements': 0.375,
            'implementation_risk': 0.25
        }
        
        self.value_weights = {
            'business_impact': 0.417,
            'scalability_potential': 0.333,
            'implementation_timeline': 0.25
        }

    def score_technical_complexity(self, criteria: Dict) -> int:
        """Score technical complexity based on objective criteria."""
        score = 1
        
        # Technology type
        tech_scores = {
            'existing_apis': 1,
            'minor_customization': 2,
            'custom_development': 3,
            'cutting_edge': 4,
            'experimental': 5
        }
        score += tech_scores.get(criteria.get('technology_type', 'existing_apis'), 1)
        
        # Integration count
        integrations = criteria.get('integration_count', 0)
        if integrations <= 1:
            score += 1
        elif integrations <= 2:
            score += 2
        elif integrations <= 5:
            score += 3
        elif integrations <= 10:
            score += 4
        else:
            score += 5
            
        # Team experience percentage
        experience = criteria.get('team_experience_percent', 100)
        if experience >= 80:
            score += 1
        elif experience >= 60:
            score += 2
        elif experience >= 40:
            score += 3
        elif experience >= 20:
            score += 4
        else:
            score += 5
            
        return min(5, max(1, score // 3))

    def score_resource_requirements(self, criteria: Dict) -> int:
        """Score resource requirements based on objective criteria."""
        score = 1
        
        # Team size
        team_size = criteria.get('team_size', 1)
        if team_size <= 2:
            score += 1
        elif team_size <= 4:
            score += 2
        elif team_size <= 6:
            score += 3
        elif team_size <= 10:
            score += 4
        else:
            score += 5
            
        # Infrastructure level
        infra_scores = {
            'existing': 1,
            'minor_additions': 2,
            'moderate_new': 3,
            'significant_changes': 4,
            'major_overhaul': 5
        }
        score += infra_scores.get(criteria.get('infrastructure_level', 'existing'), 1)
        
        # Expertise requirements
        expertise_scores = {
            'current_skills': 1,
            'minor_training': 2,
            'some_hiring': 3,
            'external_expertise': 4,
            'multiple_specialists': 5
        }
        score += expertise_scores.get(criteria.get('expertise_required', 'current_skills'), 1)
        
        return min(5, max(1, score // 3))

    def score_implementation_risk(self, criteria: Dict) -> int:
        """Score implementation risk based on objective criteria."""
        score = 1
        
        # Regulatory requirements
        regulatory_scores = {
            'none': 1,
            'minor': 2,
            'some': 3,
            'significant': 4,
            'heavy': 5
        }
        score += regulatory_scores.get(criteria.get('regulatory_level', 'none'), 1)
        
        # User adoption challenges
        adoption_scores = {
            'high_acceptance': 1,
            'good_buyin': 2,
            'moderate_change': 3,
            'substantial_resistance': 4,
            'high_resistance': 5
        }
        score += adoption_scores.get(criteria.get('user_adoption', 'high_acceptance'), 1)
        
        # External dependencies
        dependencies = criteria.get('external_dependencies_count', 0)
        if dependencies == 0:
            score += 1
        elif dependencies <= 2:
            score += 2
        elif dependencies <= 5:
            score += 3
        elif dependencies <= 10:
            score += 4
        else:
            score += 5
            
        return min(5, max(1, score // 3))

    def score_business_impact(self, criteria: Dict) -> int:
        """Score business impact based on objective criteria."""
        score = 1
        
        # Operational improvement level
        improvement_scores = {
            'minimal': 1,
            'modest': 2,
            'noticeable': 3,
            'significant': 4,
            'revolutionary': 5
        }
        score += improvement_scores.get(criteria.get('operational_improvement', 'minimal'), 1)
        
        # Impact scope
        scope_scores = {
            'single_team': 1,
            'department': 2,
            'multi_department': 3,
            'organization_wide': 4,
            'industry_level': 5
        }
        score += scope_scores.get(criteria.get('impact_scope', 'single_team'), 1)
        
        # Competitive advantage
        competitive_scores = {
            'none': 1,
            'minor': 2,
            'meaningful': 3,
            'major': 4,
            'market_leadership': 5
        }
        score += competitive_scores.get(criteria.get('competitive_advantage', 'none'), 1)
        
        return min(5, max(1, score // 3))

    def score_scalability_potential(self, criteria: Dict) -> int:
        """Score scalability potential based on objective criteria."""
        score = 1
        
        # Reusability
        reuse_scores = {
            'single_use': 1,
            'few_similar': 2,
            'multiple_related': 3,
            'cross_functional': 4,
            'platform_potential': 5
        }
        score += reuse_scores.get(criteria.get('reusability', 'single_use'), 1)
        
        # Extension capabilities
        extension_scores = {
            'difficult': 1,
            'minor_possible': 2,
            'moderate_capable': 3,
            'high_capable': 4,
            'exponential_scaling': 5
        }
        score += extension_scores.get(criteria.get('extension_capability', 'difficult'), 1)
        
        # External monetization
        monetization_scores = {
            'no_external': 1,
            'limited_interest': 2,
            'some_applications': 3,
            'good_market': 4,
            'high_monetization': 5
        }
        score += monetization_scores.get(criteria.get('monetization_potential', 'no_external'), 1)
        
        return min(5, max(1, score // 3))

    def score_implementation_timeline(self, criteria: Dict) -> int:
        """Score implementation timeline based on objective criteria."""
        score = 1
        
        # Development cycle (inverted scoring - faster is better)
        cycle_scores = {
            'immediate': 5,
            'rapid': 4,
            'standard': 3,
            'long': 2,
            'extended': 1
        }
        score += cycle_scores.get(criteria.get('development_cycle', 'standard'), 3)
        
        # Deployment complexity (inverted scoring)
        deployment_scores = {
            'instant': 5,
            'quick': 4,
            'phased': 3,
            'gradual': 2,
            'complex': 1
        }
        score += deployment_scores.get(criteria.get('deployment_complexity', 'phased'), 3)
        
        # Validation requirements (inverted scoring)
        validation_scores = {
            'none': 5,
            'minimal': 4,
            'normal': 3,
            'standard': 2,
            'extensive': 1
        }
        score += validation_scores.get(criteria.get('validation_requirements', 'normal'), 3)
        
        return min(5, max(1, score // 3))

    def evaluate_project(self, criteria: Dict) -> Dict:
        """Evaluate a project and return scores."""
        
        # Calculate dimension scores
        scores = {
            'technical_complexity': self.score_technical_complexity(criteria.get('technical', {})),
            'resource_requirements': self.score_resource_requirements(criteria.get('resources', {})),
            'implementation_risk': self.score_implementation_risk(criteria.get('risk', {})),
            'business_impact': self.score_business_impact(criteria.get('business', {})),
            'scalability_potential': self.score_scalability_potential(criteria.get('scalability', {})),
            'implementation_timeline': self.score_implementation_timeline(criteria.get('timeline', {}))
        }
        
        # Calculate weighted scores
        weighted_scores = {
            dim: score * self.weights[dim] 
            for dim, score in scores.items()
        }
        
        # Calculate risk and value scores
        risk_score = (
            scores['technical_complexity'] * self.risk_weights['technical_complexity'] +
            scores['resource_requirements'] * self.risk_weights['resource_requirements'] +
            scores['implementation_risk'] * self.risk_weights['implementation_risk']
        )
        
        value_score = (
            scores['business_impact'] * self.value_weights['business_impact'] +
            scores['scalability_potential'] * self.value_weights['scalability_potential'] +
            scores['implementation_timeline'] * self.value_weights['implementation_timeline']
        )
        
        # Calculate final score
        final_score = (value_score * 0.6) - (risk_score * 0.4)
        
        # Determine priority
        if value_score >= 4.0 and risk_score <= 2.5:
            priority = "Priority 1 - Immediate implementation"
        elif value_score >= 4.0 and risk_score <= 3.5:
            priority = "Priority 2 - Detailed planning required"
        elif value_score >= 4.0:
            priority = "Priority 2 - Risk mitigation planning"
        elif value_score >= 3.0 and risk_score <= 2.5:
            priority = "Priority 3 - Quick wins consideration"
        elif value_score >= 3.0:
            priority = "Priority 4 - Defer pending improvements"
        else:
            priority = "Priority 4 - Reject or major redesign"
        
        return {
            'dimension_scores': scores,
            'weighted_scores': weighted_scores,
            'risk_score': round(risk_score, 2),
            'value_score': round(value_score, 2),
            'final_score': round(final_score, 2),
            'priority': priority
        }

def main():
    """Example usage of the evaluator."""
    evaluator = ProjectEvaluator()
    
    # Example criteria for exotic trades project
    example_criteria = {
        'technical': {
            'technology_type': 'cutting_edge',
            'integration_count': 6,
            'team_experience_percent': 30
        },
        'resources': {
            'team_size': 7,
            'infrastructure_level': 'significant_changes',
            'expertise_required': 'external_expertise'
        },
        'risk': {
            'regulatory_level': 'significant',
            'user_adoption': 'substantial_resistance',
            'external_dependencies_count': 4
        },
        'business': {
            'operational_improvement': 'significant',
            'impact_scope': 'organization_wide',
            'competitive_advantage': 'major'
        },
        'scalability': {
            'reusability': 'platform_potential',
            'extension_capability': 'high_capable',
            'monetization_potential': 'high_monetization'
        },
        'timeline': {
            'development_cycle': 'standard',
            'deployment_complexity': 'phased',
            'validation_requirements': 'extensive'
        }
    }
    
    result = evaluator.evaluate_project(example_criteria)
    
    print("Project Evaluation Results:")
    print("=" * 50)
    print(f"Technical Complexity: {result['dimension_scores']['technical_complexity']}")
    print(f"Resource Requirements: {result['dimension_scores']['resource_requirements']}")
    print(f"Implementation Risk: {result['dimension_scores']['implementation_risk']}")
    print(f"Business Impact: {result['dimension_scores']['business_impact']}")
    print(f"Scalability Potential: {result['dimension_scores']['scalability_potential']}")
    print(f"Implementation Timeline: {result['dimension_scores']['implementation_timeline']}")
    print()
    print(f"Risk Score: {result['risk_score']}")
    print(f"Value Score: {result['value_score']}")
    print(f"Final Score: {result['final_score']}")
    print(f"Priority: {result['priority']}")

if __name__ == "__main__":
    main()