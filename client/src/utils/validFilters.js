const validPubtypes = {
    "data": [
        {
            "publication_type": "Legal Case"
        },
        {
            "publication_type": "Address"
        },
        {
            "publication_type": "Consensus Development Conference"
        },
        {
            "publication_type": "Multicenter Study"
        },
        {
            "publication_type": "Dataset"
        },
        {
            "publication_type": "Guideline"
        },
        {
            "publication_type": "Research Support, Non-U.S. Gov't"
        },
        {
            "publication_type": "Clinical Trial, Phase III"
        },
        {
            "publication_type": "Preprint"
        },
        {
            "publication_type": "Practice Guideline"
        },
        {
            "publication_type": "Personal Narrative"
        },
        {
            "publication_type": "Comparative Study"
        },
        {
            "publication_type": "Clinical Trial, Phase IV"
        },
        {
            "publication_type": "Clinical Trial"
        },
        {
            "publication_type": "Equivalence Trial"
        },
        {
            "publication_type": "Biography"
        },
        {
            "publication_type": "Lecture"
        },
        {
            "publication_type": "Clinical Conference"
        },
        {
            "publication_type": "Research Support, N.I.H., Intramural"
        },
        {
            "publication_type": "Journal Article"
        },
        {
            "publication_type": "Retraction of Publication"
        },
        {
            "publication_type": "Pragmatic Clinical Trial"
        },
        {
            "publication_type": "Evaluation Study"
        },
        {
            "publication_type": "Controlled Clinical Trial"
        },
        {
            "publication_type": "Congress"
        },
        {
            "publication_type": "Randomized Controlled Trial"
        },
        {
            "publication_type": "News"
        },
        {
            "publication_type": "Validation Study"
        },
        {
            "publication_type": "Case Reports"
        },
        {
            "publication_type": "Webcast"
        },
        {
            "publication_type": "Editorial"
        },
        {
            "publication_type": "Interview"
        },
        {
            "publication_type": "Twin Study"
        },
        {
            "publication_type": "Research Support, U.S. Gov't, P.H.S."
        },
        {
            "publication_type": "Comment"
        },
        {
            "publication_type": "Clinical Study"
        },
        {
            "publication_type": "Clinical Trial, Phase II"
        },
        {
            "publication_type": "Introductory Journal Article"
        },
        {
            "publication_type": "Meta-Analysis"
        },
        {
            "publication_type": "Clinical Trial Protocol"
        },
        {
            "publication_type": "Research Support, N.I.H., Extramural"
        },
        {
            "publication_type": "Autobiography"
        },
        {
            "publication_type": "Review"
        },
        {
            "publication_type": "Systematic Review"
        },
        {
            "publication_type": "Research Support, U.S. Gov't, Non-P.H.S."
        },
        {
            "publication_type": "Technical Report"
        },
        {
            "publication_type": "Historical Article"
        },
        {
            "publication_type": "Retracted Publication"
        },
        {
            "publication_type": "Published Erratum"
        },
        {
            "publication_type": "Portrait"
        },
        {
            "publication_type": "English Abstract"
        },
        {
            "publication_type": "Clinical Trial, Phase I"
        },
        {
            "publication_type": "Expression of Concern"
        },
        {
            "publication_type": "Patient Education Handout"
        },
        {
            "publication_type": "Letter"
        },
        {
            "publication_type": "Randomized Controlled Trial, Veterinary"
        },
        {
            "publication_type": "Video-Audio Media"
        },
        {
            "publication_type": "Observational Study"
        }
    ]
};

const validCategories = {
  data: [
    {
      category: "proteomics",
    },
    {
      category: "antibodies",
    },
    {
      category: "origin",
    },
    {
      category: "vertical transmission",
    },
    {
      category: "drugs",
    },
    {
      category: "pollution",
    },
    {
      category: "cytokine",
    },
    {
      category: "obesity",
    },
    {
      category: "pathogenesis",
    },
    {
      category: "healthcare workers",
    },
    {
      category: "positive selection",
    },
    {
      category: "diabetes",
    },
    {
      category: "united states",
    },
    {
      category: "nurses",
    },
    {
      category: "journal article",
    },
    {
      category: "physiology",
    },
    {
      category: "smoking",
    },
    {
      category: "myocardial",
    },
    {
      category: "homology",
    },
    {
      category: "comparative study",
    },
    {
      category: "physician's role",
    },
    {
      category: "structural genomics",
    },
    {
      category: "lung damageigg",
    },
    {
      category: "liver",
    },
    {
      category: "potential targets",
    },
    {
      category: "immune system",
    },
    {
      category: "prevention and control",
    },
    {
      category: "editorial",
    },
    {
      category: "interferon",
    },
    {
      category: "asymptomatic",
    },
    {
      category: "prevention",
    },
    {
      category: "environment",
    },
    {
      category: "ace2",
    },
    {
      category: "sars",
    },
    {
      category: "phylogenetic tree",
    },
    {
      category: "drug repurposing",
    },
    {
      category: "ethics",
    },
    {
      category: "zinc",
    },
    {
      category: "medical students",
    },
    {
      category: "intensive care",
    },
    {
      category: "negative selection",
    },
    {
      category: "statistics",
    },
    {
      category: "molecular biology",
    },
    {
      category: "hiv",
    },
    {
      category: "elderly",
    },
    {
      category: "travel restrictions",
    },
    {
      category: "convalescent plasmamasks",
    },
    {
      category: "kawasaki",
    },
    {
      category: "comment",
    },
    {
      category: "chloroquine",
    },
    {
      category: "neutral selection",
    },
    {
      category: "ischaemia",
    },
    {
      category: "immune evasion",
    },
    {
      category: "risk communication",
    },
    {
      category: "surveillance",
    },
    {
      category: "risk factors",
    },
    {
      category: "myocarditis",
    },
    {
      category: "genomic diversity",
    },
    {
      category: "australia",
    },
    {
      category: "hydroxychloroquine",
    },
    {
      category: "physicians",
    },
    {
      category: "mutation",
    },
    {
      category: "vitamin c",
    },
    {
      category: "research support",
    },
    {
      category: "neurotropism",
    },
    {
      category: "coronaviruses",
    },
    {
      category: "adaptation",
    },
    {
      category: "nervous system",
    },
    {
      category: "antiviral drugs",
    },
    {
      category: "pregnancy",
    },
    {
      category: "phylogeny",
    },
    {
      category: "clinical study",
    },
    {
      category: "therapeutic targets",
    },
    {
      category: "published erratum",
    },
    {
      category: "genomics",
    },
    {
      category: "influenza",
    },
    {
      category: "rehabilitation",
    },
    {
      category: "vaccine",
    },
    {
      category: "evasion",
    },
    {
      category: "antiviral",
    },
    {
      category: "antigenicity",
    },
    {
      category: "epidemiology",
    },
    {
      category: "virology",
    },
    {
      category: "cancer",
    },
    {
      category: "case reports",
    },
    {
      category: "inhibition",
    },
    {
      category: "biochemistry",
    },
    {
      category: "bioinformatics",
    },
    {
      category: "spike protein",
    },
    {
      category: "public-health",
    },
    {
      category: "immunotherapy",
    },
    {
      category: "molecular dynamics",
    },
    {
      category: "drug development",
    },
    {
      category: "structure",
    },
    {
      category: "mechanism",
    },
    {
      category: "viral shedding",
    },
    {
      category: "viral load",
    },
    {
      category: "evolution",
    },
    {
      category: "africa",
    },
    {
      category: "comorbidities",
    },
    {
      category: "vitamin d",
    },
    {
      category: "transmission",
    },
    {
      category: "selection",
    },
    {
      category: "bat",
    },
    {
      category: "schools",
    },
    {
      category: "europe",
    },
    {
      category: "treatment",
    },
    {
      category: "recombination",
    },
    {
      category: "pneumonia",
    },
    {
      category: "china",
    },
    {
      category: "neuroinvasion",
    },
    {
      category: "preprint",
    },
    {
      category: "vaccination",
    },
    {
      category: "telemedicine",
    },
    {
      category: "south korea",
    },
    {
      category: "tmprss2",
    },
    {
      category: "plasma",
    },
    {
      category: "children",
    },
    {
      category: "letter",
    },
    {
      category: "lungs",
    },
    {
      category: "anosmia",
    },
    {
      category: "coinfection",
    },
    {
      category: "population genetics",
    },
    {
      category: "contact tracing",
    },
    {
      category: "fertility",
    },
    {
      category: "immunosuppression",
    },
    {
      category: "personal protective equipment",
    },
    {
      category: "drug target",
    },
    {
      category: "remdesivir",
    },
    {
      category: "inflammation",
    },
    {
      category: "quarantine",
    },
    {
      category: "mers",
    },
    {
      category: "acute respiratory distress syndrome",
    },
    {
      category: "molecular evolution",
    },
    {
      category: "wuhan",
    },
    {
      category: "mental health",
    },
    {
      category: "comparative genomics",
    },
    {
      category: "molecular docking",
    },
    {
      category: "kidney",
    },
    {
      category: "asia",
    },
    {
      category: "asthma",
    },
    {
      category: "news",
    },
    {
      category: "new york",
    },
    {
      category: "pangolin",
    },
    {
      category: "cytokine storm",
    },
    {
      category: "angiotensin",
    },
    {
      category: "genome",
    },
    {
      category: "practice guideline",
    },
    {
      category: "3clpro",
    },
    {
      category: "review",
    },
    {
      category: "mortality",
    },
    {
      category: "clinical trial",
    },
  ],
};

export {validCategories, validPubtypes};