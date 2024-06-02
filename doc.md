Error: Failed to create changeset for the stack: prodxcloud-saas-serverless-sam, ex: Waiter ChangeSetCreateComplete failed: Waiter encountered a terminal failure state: For expression "Status" we matched expected path: "FAILED" Status: FAILED. Reason: User: arn:aws:iam::0te: For expression "Status" we matched expectete: For expression "Status" we matched expected path: "FAILED" Status: FAILED. Reason: User: arn:aws:iam::059978233428:root is not authorized to perform: cloudformation:CreateChangeSet on resource: arn:aws:cloudformation:us-east-1:aws:transform/Serverless-2018-10-31

{
    "Version": "2012-10-17",
    "Statement": [{
        "Effect": "Allow",
        "Action": [
            "cloudformation:CreateChangeSet",
             "cloudformation:CreateStack",
            "cloudformation:DescribeStacks",
            "cloudformation:DescribeStackEvents",
            "cloudformation:DescribeStackResources",
            "cloudformation:GetTemplate",
            "cloudformation:ValidateTemplate"
        ],
        "Resource": "arn:aws:cloudformation:us-east-1:aws:transform/Serverless-2018-10-31"
    }]
}

Created policy : sam-stack-cli


for All

{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "VisualEditor0",
			"Effect": "Allow",
			"Action": "cloudformation:*",
			"Resource": "*"
		}
	]
}